TriggerRegister.registerChat("xphQuestComplete").setChatCriteria("\n&r&a${type} Quest: ${quest} Completed!&r\n&r&7 &8+&3${xp}&7 &7Hypixel Experience&r\n&r&7 &8+&6${coins}&7 &7${game} Coins&r\n&r");
TriggerRegister.registerChat("xphChallengeComplete").setChatCriteria("\n&r&a${challenge} Challenge Completed!&r\n&r&7 &8+&3${xp}&7 &7Hypixel Experience&r\n&r\n&r&7You can complete &e&a${challengesleft} &7more challenges today.&r\n&r");
TriggerRegister.registerChat("xphChallengeComplete").setChatCriteria("\n&r&a${challenge} Challenge Completed!&r\n&r&7 &8+&3${xp}&7 &7Hypixel Experience&r\n&r\n&r&7You can complete &e&c${challengesleft} &7more challenges today.&r\n&r");
TriggerRegister.registerChat("xphChallengeComplete").setChatCriteria("\n&r&a${challenge} Challenge Completed!&r\n&r&7 &8+&3${xp}&7 &7Hypixel Experience&r\n&r\n&r&7You can complete &e&e${challengesleft} &7more challenges today.&r\n&r");
//                                                                    \n&r&a${challenge} Challenge Completed!&r\n&r&7 &8+&32,400&7 &7Hypixel Experience&r\n&r\n&r&7You can complete &e&e9 &7more challenges today.&r\n&r
//                                                                    \n&r&aEnderchest Challenge Completed!&r\n&r&7 &8+&32,400&7 &7Hypixel Experience&r\n&r\n&r&7You can complete &e&e1 &7more challenges today.&r\n&r

function xphQuestComplete(type, quest, xp, coins, game) {
  xphDailyStats.quests++;
  xphDailyStats.xp += removeCommas(xp);
  xphDailyStats.coins += removeCommas(coins);

  xphTotalStats.quests++;
  xphTotalStats.xp += removeCommas(xp);
  xphTotalStats.coins += removeCommas(coins);

  ChatLib.chat("&aTotal XP gained today: &9" + xphDailyStats.xp + "\n&aTotal quests completed today: &e" + xphDailyStats.quests + "\n&atotal coins gained today: &6" + xphDailyStats.coins);
}

function xphChallengeComplete(challenge, xp, challengesleft) {
  xphDailyStats.challenges++;
  xphDailyStats.xp += removeCommas(xp);
  xphDailyStats.challengesleft = challengesleft;

  xphTotalStats.challenges++;
  xphTotalStats.xp += removeCommas(xp);

  ChatLib.chat("&aTotal XP gained today: &9" + xphDailyStats.xp + "\n&etotal challenges completed today: &b" + xphDailyStats.challenges);
}
