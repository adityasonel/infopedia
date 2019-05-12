import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UiStatusBar } from "../component";
import { viewTopPadding, calculatedHeight } from "../utils";

export default class itemDetailScreen extends React.PureComponent {
    onPressBack = () => {
        this.props.navigation.goBack();
    };
    render() {
        let data = this.props.navigation.getParam("data", "");
        console.log("xoxo, data", data);
        return (
            <View style={styles.container}>
                <UiStatusBar backgroundColor="white" barStyle="dark-content" />
                <ImageBackground source={{ uri: data.artworkUrl100 }} style={styles.imageContainer}>
                    <View
                        style={{
                            paddingLeft: 20,
                            paddingRight: 20,
                            paddingTop: viewTopPadding,
                            justifyContent: "space-between",
                            flex: 1
                        }}
                    >
                        <TouchableOpacity onPress={this.onPressBack}>
                            <Icon name="ios-arrow-back" size={30} color="black" />
                        </TouchableOpacity>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textheader}>
                            {data.name}
                        </Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        width: "100%",
        height: calculatedHeight(40)
    },
    textheader: {
        color: "black",
        fontFamily: "ProductSans-Bold",
        fontSize: 36,
        paddingTop: 8,
        paddingBottom: 8
    },
    textError: {
        color: "grey",
        fontFamily: "ProductSans-Bold",
        fontSize: 18,
        marginTop: calculatedHeight(2)
    }
});
