// POST Groups
    // 1. happy case - post group and map it to adminID
    // 2. error case - invalid adminID in the request

// GET Groups for adminId
    // 1. happy case - adminID is valid and admin has groups
    // 2. happy case - adminID is valid but he doesnot have any groups
    // 3. error case - invalid adminID

// GET group by groupID
    // 1. happy case - valid groupID - **check for contacts field**
    // 2. error case -  invalid groupID

// POST Contact to the group
    // 1. happy case - valid groupID & contactID
    // 2. error case - valid groupID & invalid contactID

// DELETE Contact from a group
    // 1. happy case - valid groupID & contactID and contact in given group
    // 2. error case - valid groupID & contactID , contact not in the group
    
// PUT group
    // 1. happy case - edit group with valid groupID
    // 2. error case - edit group with invalid adminID

// DELETE group
    // 1. happy case - edit group with valid groupID
    // 2. error case - edit group with invalid adminID
