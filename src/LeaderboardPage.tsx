import React from "react";
import { Text, Container, Content, List, ListItem, Left, Right, Body, Thumbnail } from "native-base";
import { StyleSheet, View } from "react-native";
import Leaderboard from "react-native-leaderboard";
import Page from "./Page";

const data = [
    { userName: "Tom", highScore: 12462, icon: "https://cdn.discordapp.com/attachments/347043966476353538/746848370605293599/Untitsdsled.png" },
    { userName: "Jane (Me)", highScore: 1200, icon: "https://cdn.discordapp.com/attachments/347043966476353538/746848370605293599/Untitsdsled.png" },
    { userName: "Jacob", highScore: 52, icon: "https://specials-images.forbesimg.com/imageserve/1024724898/960x0.jpg?fit=scale" },
    { userName: "Liam", highScore: 5623, icon: "https://i2.wp.com/thepointsguy.com/wp-content/uploads/2020/04/GettyImages-1077097080.jpg?fit=2210%2C1357px&ssl=1" },
    { userName: "Gleb", highScore: 2005, icon: "https://images.thestar.com/1L3hG8JS_mLmJsB1HAsC5nT1Ass=/1280x1024/smart/filters:cb(1593142732590)/https://www.thestar.com/content/dam/thestar/life/travel/2020/06/25/do-you-need-a-scenery-change/icefields_parkway_debbie_olsen.jpg" },
    { userName: "Samuel", highScore: 3331, icon: "https://pbs.twimg.com/profile_images/1188507013233479681/WuNwaQ8R_400x400.jpg" },
    { userName: "Natalie", highScore: 2564, icon: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" },
    { userName: "Wyatt", highScore: 8935, icon: "https://www.mantruckandbus.com/fileadmin/_processed_/2/c/csm_kleiss-interview-header_f8b7588730.jpg" },
];

const LeaderboardPage = () => (
    <Leaderboard
        data={data}
        sortBy="highScore"
        labelBy="userName"
        icon="icon"
    />
);

export default LeaderboardPage;
