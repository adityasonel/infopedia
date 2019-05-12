import React from "react";
import { StyleSheet, Text, ImageBackground, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { calculatedHeight, calculatedWidth } from "../utils/";

class ListItemComponent extends React.PureComponent {
    render() {
        let { isVerticalList, data, onPressItem } = this.props;
        return (
            <TouchableOpacity onPress={onPressItem} activeOpacity={0.8}>
                <ImageBackground
                    defaultSource={require("../asset/img/item_placeholder.jpg")}
                    source={{ uri: data.artworkUrl100 }}
                    // source={require("../asset/img/item_placeholder.jpg")}
                    style={[
                        styles.container,
                        {
                            width: isVerticalList ? "100%" : calculatedWidth(36),
                            marginTop: isVerticalList ? 8 : 0,
                            marginBottom: isVerticalList ? 8 : 0
                        }
                    ]}
                >
                    <LinearGradient colors={["#10000000", "#333333"]} style={styles.gradientBackground}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode={"tail"}>
                            {data.name != undefined ? data.name : "Infopedia"}
                        </Text>
                        <Text style={styles.desc} numberOfLines={1} ellipsizeMode={"tail"}>
                            {data.artistName != undefined ? data.artistName : "Infopedia"}
                        </Text>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: calculatedHeight(28),
        borderRadius: 8,
        overflow: "hidden",
        justifyContent: "flex-end",
        marginRight: 12
    },
    title: {
        color: "white",
        fontFamily: "ProductSans-Bold",
        fontSize: 20
    },
    desc: {
        color: "white",
        fontFamily: "ProductSans-Regular"
    },
    gradientBackground: {
        padding: 12
    }
});

export { ListItemComponent };
