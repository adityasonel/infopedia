import React from "react";
import { View, StatusBar, Platform } from "react-native";

const UiStatusBar = props => {
    const { backgroundColor } = props;
    const height = Platform.OS === "ios" ? 26 : 0;
    return (
        <View style={{ height: height, backgroundColor }}>
            <StatusBar {...props} />
        </View>
    );
};

export { UiStatusBar };
