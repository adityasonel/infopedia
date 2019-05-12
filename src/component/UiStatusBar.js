import React from "react";
import { View, StatusBar, Platform } from "react-native";

const UiStatusBar = props => {
    const height = Platform.OS === "ios" ? 20 : 0;
    const { backgroundColor } = props;
    return (
        <View style={{ height, backgroundColor }}>
            <StatusBar {...props} />
        </View>
    );
};

export { UiStatusBar };
