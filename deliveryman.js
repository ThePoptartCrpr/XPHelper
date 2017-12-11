TriggerRegister.registerChat("openVoteLink").setChatCriteria("&aToday's voting link is &r&b${URL}&r&a!&r&a &aFollow the instructions on the website to redeem &95,000 XP &aand &63,000 Arcade Coins&a!&r");
TriggerRegister.registerChat("openRewardLink").setChatCriteria("\n&r&6Click the link to visit our website and claim your reward: &r&b${URL}&r\n&r");

function openVoteLink(URL) {
	java.awt.Desktop.getDesktop().browse(new java.net.URI("http://" + URL));
}

function openRewardLink(URL) {
	java.awt.Desktop.getDesktop().browse(new java.net.URI(URL));
}