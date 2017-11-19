module.exports = {
  matchIdParam: {
    name: 'match_id',
    in: 'path',
    required: true,
    type: 'integer',
  },
  accountIdParam: {
    name: 'account_id',
    in: 'path',
    description: 'Steam32 account ID',
    required: true,
    type: 'integer',
  },
  fieldParam: {
    name: 'field',
    in: 'path',
    description: 'Field to aggregate on',
    required: true,
    type: 'string',
  },
  limitParam: {
    name: 'limit',
    in: 'query',
    description: 'Number of matches to limit to',
    required: false,
    type: 'integer',
  },
  offsetParam: {
    name: 'offset',
    in: 'query',
    description: 'Number of matches to offset start by',
    required: false,
    type: 'integer',
  },
  projectParam: {
    name: 'project',
    in: 'query',
    description: 'Fields to project (array)',
    required: false,
    type: 'string',
  },
  winParam: {
    name: 'win',
    in: 'query',
    description: 'Whether the player won',
    required: false,
    type: 'integer',
  },
  patchParam: {
    name: 'patch',
    in: 'query',
    description: 'Patch ID',
    required: false,
    type: 'integer',
  },
  gameModeParam: {
    name: 'game_mode',
    in: 'query',
    description: 'Game Mode ID',
    required: false,
    type: 'integer',
  },
  lobbyTypeParam: {
    name: 'lobby_type',
    in: 'query',
    description: 'Lobby type ID',
    required: false,
    type: 'integer',
  },
  regionParam: {
    name: 'region',
    in: 'query',
    description: 'Region ID',
    required: false,
    type: 'integer',
  },
  dateParam: {
    name: 'date',
    in: 'query',
    description: 'Days previous',
    required: false,
    type: 'integer',
  },
  laneRoleParam: {
    name: 'lane_role',
    in: 'query',
    description: 'Lane Role ID',
    required: false,
    type: 'integer',
  },
  heroIdParam: {
    name: 'hero_id',
    in: 'query',
    description: 'Hero ID',
    required: false,
    type: 'integer',
  },
  isRadiantParam: {
    name: 'is_radiant',
    in: 'query',
    description: 'Whether the player was radiant',
    required: false,
    type: 'integer',
  },
  withHeroIdParam: {
    name: 'with_hero_id',
    in: 'query',
    description: "Hero IDs on the player's team (array)",
    required: false,
    type: 'integer',
  },
  againstHeroIdParam: {
    name: 'against_hero_id',
    in: 'query',
    description: "Hero IDs against the player's team (array)",
    required: false,
    type: 'integer',
  },
  includedAccountIdParam: {
    name: 'included_account_id',
    in: 'query',
    description: 'Account IDs in the match (array)',
    required: false,
    type: 'integer',
  },
  excludedAccountIdParam: {
    name: 'excluded_account_id',
    in: 'query',
    description: 'Account IDs not in the match (array)',
    required: false,
    type: 'integer',
  },
  significantParam: {
    name: 'significant',
    in: 'query',
    description: 'Whether the match was significant for aggregation purposes',
    required: false,
    type: 'integer',
  },
  sortParam: {
    name: 'sort',
    in: 'query',
    description: 'The field to return matches sorted by in descending order',
    required: false,
    type: 'string',
  },
  minimumPlayedParam: {
    name: 'games_played',
    in: 'query',
    description: 'The minimum number of games played, for filtering hero stats',
    required: false,
    type: 'integer',
  },
  minMmrParam: {
    name: 'min_mmr',
    in: 'query',
    description: 'Minimum average MMR',
    required: false,
    type: 'integer',
  },
  maxMmrParam: {
    name: 'max_mmr',
    in: 'query',
    description: 'Maximum average MMR',
    required: false,
    type: 'integer',
  },
  minTimeParam: {
    name: 'min_time',
    in: 'query',
    description: 'Minimum start time (Unix time)',
    required: false,
    type: 'integer',
  },
  maxTimeParam: {
    name: 'max_time',
    in: 'query',
    description: 'Maximum start time (Unix time)',
    required: false,
    type: 'integer',
  },
  mmrAscendingParam: {
    name: 'mmr_ascending',
    in: 'query',
    description: 'Order by MMR ascending',
    required: false,
    type: 'integer',
  },
  mmrDescendingParam: {
    name: 'mmr_descending',
    in: 'query',
    description: 'Order by MMR descending',
    required: false,
    type: 'integer',
  },
  lessThanMatchIdParam: {
    name: 'less_than_match_id',
    in: 'query',
    description: 'Get matches with a match ID lower than this value',
    required: false,
    type: 'integer',
  },
};
