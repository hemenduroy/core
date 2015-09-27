var express = require('express');
var matches = express.Router();
var compute = require('../compute');
var config = require('../config');
var computeMatchData = compute.computeMatchData;
var computePlayerMatchData = compute.computePlayerMatchData;
var renderMatch = compute.renderMatch;
var constants = require('../constants.json');
var matchPages = constants.match_pages;
module.exports = function(db, redis) {
    matches.get('/:match_id/:info?', function(req, res, next) {
        console.time("match page");
        prepareMatch(req.params.match_id, function(err, match) {
            if (err) {
                return next(err);
            }
            console.timeEnd("match page");
            var info = matchPages[req.params.info] ? req.params.info : "index";
            if (req.query.json) {
                return res.json(match);
            }
            res.render("match/match_" + info, {
                route: info,
                match: match,
                tabs: matchPages,
                display_types: {
                    "DOTA_UNIT_ORDER_MOVE_TO_POSITION": "Move (P)",
                    "DOTA_UNIT_ORDER_MOVE_TO_TARGET": "Move (T)",
                    "DOTA_UNIT_ORDER_ATTACK_MOVE": "Attack (M)",
                    "DOTA_UNIT_ORDER_ATTACK_TARGET": "Attack (T)",
                    "DOTA_UNIT_ORDER_CAST_POSITION": "Cast (P)",
                    "DOTA_UNIT_ORDER_CAST_TARGET": "Cast (T)",
                    //"DOTA_UNIT_ORDER_CAST_TARGET_TREE"
                    "DOTA_UNIT_ORDER_CAST_NO_TARGET": "Cast (N)",
                    //"DOTA_UNIT_ORDER_CAST_TOGGLE"
                    "DOTA_UNIT_ORDER_HOLD_POSITION": "Hold",
                    //"DOTA_UNIT_ORDER_TRAIN_ABILITY",
                    "DOTA_UNIT_ORDER_DROP_ITEM": "Drop",
                    "DOTA_UNIT_ORDER_GIVE_ITEM": "Give",
                    "DOTA_UNIT_ORDER_PICKUP_ITEM": "Pickup",
                    //"DOTA_UNIT_ORDER_PICKUP_RUNE"
                    //"DOTA_UNIT_ORDER_PURCHASE_ITEM"
                    //"DOTA_UNIT_ORDER_SELL_ITEM"
                    //"DOTA_UNIT_ORDER_DISASSEMBLE_ITEM"
                    //"DOTA_UNIT_ORDER_MOVE_ITEM"
                    //"DOTA_UNIT_ORDER_CAST_TOGGLE_AUTO"
                    //"DOTA_UNIT_ORDER_STOP"
                    "DOTA_UNIT_ORDER_TAUNT": "Taunt",
                    //"DOTA_UNIT_ORDER_BUYBACK",
                    "DOTA_UNIT_ORDER_GLYPH": "Glyph",
                    //"DOTA_UNIT_ORDER_EJECT_ITEM_FROM_STASH"
                    //"DOTA_UNIT_ORDER_CAST_RUNE"
                    "DOTA_UNIT_ORDER_PING_ABILITY": "Pings (Ability)",
                    //"DOTA_UNIT_ORDER_MOVE_TO_DIRECTION": "Move (D)"
                },
                title: "Match " + match.match_id + " - YASP"
            });
        });
    });
    return matches;

    function prepareMatch(match_id, cb) {
        var key = "match:" + match_id;
        redis.get(key, function(err, reply) {
            if (err) {
                return cb(err);
            }
            else if (reply) {
                console.log("Cache hit for match " + match_id);
                var match = JSON.parse(reply);
                return cb(err, match);
            }
            else {
                console.log("Cache miss for match " + match_id);
                db.from('matches').where({
                    match_id: Number(match_id)
                }).asCallback(function(err, match) {
                    if (err) {
                        return cb(err);
                    }
                    else {
                        //join to get personaname, last_login, avatar
                        db.from('player_matches').where({
                            match_id: Number(match_id)
                        }).leftJoin('players', 'player_matches.account_id', 'players.account_id').innerJoin('matches', 'match_id', 'matches.match_id').asCallback(function(err, players) {
                            if (err) {
                                return cb(err);
                            }
                            match.players = players;
                            match.players.forEach(function(p) {
                                computePlayerMatchData(p);
                            });
                            computeMatchData(match);
                            renderMatch(match);
                            if (match.version && config.NODE_ENV !== "development") {
                                redis.setex(key, 3600, JSON.stringify(match));
                            }
                            return cb(err, match);
                        });
                    }
                });
            }
        });
    }
};
