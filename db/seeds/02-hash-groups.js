
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('groups').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups').insert([
        {id: 1, groupName: 'hash group 1', groupDescription: 'hash group', adminId: '1', groupInviteHash: 'group1Admin1Hash'},
        {id: 2, groupName: 'hash group 2', groupDescription: 'hash group', adminId: '1', groupInviteHash: 'group2Admin1Hash'},
        {id: 3, groupName: 'hash group 3', groupDescription: 'hash group', adminId: '1', groupInviteHash: 'group3Admin1Hash'}
      ]);
    });
};
