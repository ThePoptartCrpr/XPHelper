// \n&r&6Click the link to visit our website and claim your reward: &r&bhttp://rewards.hypixel.net/claim-reward/e43737ef&r\n&r

// &aToday's voting link is &r&bvote.hypixel.net/0&r&a!&r&a &aFollow the instructions on the website to redeem &95,000 XP &aand &63,000 Arcade Coins&a!&r


// &r&aYou have successfully claimed &r&32,000 &r&3Hypixel &r&3Experience&r&a and &r&63,000 &r&6Arcade &r&6Coins&r&a!&r

// &fYou have claimed a &r&f&l[Common Quakecraft Coins] &r&freward card!&r

// &6Thanks for supporting the server! You earned &r&95,000 XP&r&6 and 3,000 Arcade Coins!&r

TriggerRegister.registerChat("openVoteLink").setChatCriteria("&aToday's voting link is &r&b${URL}&r&a!&r&a &aFollow the instructions on the website to redeem &95,000 XP &aand &63,000 Arcade Coins&a!&r");
TriggerRegister.registerChat("openRewardLink").setChatCriteria("\n&r&6Click the link to visit our website and claim your reward: &r&b${URL}&r\n&r");

function openVoteLink(URL) {
	java.awt.Desktop.getDesktop().browse(new java.net.URI("http://" + URL));
}

function openRewardLink(URL) {
	java.awt.Desktop.getDesktop().browse(new java.net.URI(URL));
}