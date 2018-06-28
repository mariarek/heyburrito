const log = require('bog');

module.exports = ((msg, emojis) => {
    const hits = [];
    const users = [];
    const updates = [];
    const regex = /(\<\@[A-Z0-9]{2,}\>)/g;

    // Regex to get all users from message
    const usersRaw = msg.text.match(new RegExp(regex));

    // remove <@ and >
    if (usersRaw) {
        for (const u of usersRaw) {
            const username = u.replace('<@', '').replace('>', '');

            // Check if username already exists in array
            if (!users.includes(username)) {
                users.push(username);
            }
        }
    } else {
        return false;
    }

    // Count hits
    emojis.map((x) => {
        const hit = msg.text.match(x.emoji);
        if (hit) {
            emojihit = msg.text.match(new RegExp(x.emoji, 'g'));
            for (const e of emojihit) {
                const obj = {
                    emoji: x.emoji,
                    type: x.type,
                };
                hits.push(obj);
            }
        }
    });
    if (hits.length === 0) {
        return false;
    }

    // Create object for each user for each emoji hit

    for (const i of hits) {
        for (const u of users) {
            const obj = {
                username: u,
                type: i.type,
            };
            updates.push(obj);
        }
    }

    return {
        giver: msg.user,
        updates,
    };
});