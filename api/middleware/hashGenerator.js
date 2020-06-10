const bcrypt = require('bcryptjs');

async function generateGroupInviteHash(groupId, adminId){

    // input string that contains groupId and adminId
    const input = `group${groupId}admin${adminId}`;

    // generate the hash
    const rounds = 8;
    const salt = bcrypt.genSaltSync(rounds);
    const hash = await bcrypt.hashSync(input, salt);
    
    // return hash
    return hash;
}

module.exports = {generateGroupInviteHash};