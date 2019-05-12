import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Platform, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { viewTopPadding, calculatedHeight, windowHeight } from "../utils";

export default class itemDetailScreen extends React.PureComponent {
    onPressBack = () => {
        this.props.navigation.goBack();
    };
    render() {
        let data = this.props.navigation.getParam("data", "");
        let genres = "";
        for (let index = 0; index < data.genres.length; index++) {
            const element = data.genres[index].name;
            genres = element + ", " + genres;
        }
        return (
            <ScrollView overScrollMode="never" showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <ImageBackground source={{ uri: data.artworkUrl100 }} style={styles.imageContainer}>
                        <View style={{ position: "absolute", right: 0, left: 0, top: 0, bottom: 0, backgroundColor: "rgba(255, 255, 255, 0.6)" }} />
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
                            <Text numberOfLines={3} ellipsizeMode="tail" style={styles.textheader}>
                                {data.name}
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={{ padding: 20, paddingTop: 0 }}>
                        <Text style={styles.textTitle}>Released on</Text>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textDesc}>
                            {data.releaseDate}
                        </Text>
                        <Text style={styles.textTitle}>Artist</Text>
                        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.textDesc}>
                            {data.artistName}
                        </Text>
                        <Text style={styles.textTitle}>Genres</Text>
                        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.textDesc}>
                            {genres}
                        </Text>
                        <Text style={styles.textTitle}>Copyright</Text>
                        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.textDesc}>
                            {data.copyright !== undefined && data.copyright !== "" ? data.copyright : "No info available"}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
        overflow: "hidden",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingTop: Platform.OS === "ios" ? 26 : 0,
        width: "100%",
        height: windowHeight / 1.6
    },
    textheader: {
        color: "black",
        fontFamily: "ProductSans-Bold",
        fontSize: 26,
        paddingTop: 8,
        paddingBottom: 8
    },
    textError: {
        color: "grey",
        fontFamily: "ProductSans-Bold",
        fontSize: 18,
        marginTop: calculatedHeight(2)
    },
    textTitle: {
        color: "grey",
        marginTop: 12,
        fontFamily: "ProductSans-Regular",
        fontSize: 18
    },
    textDesc: {
        color: "black",
        marginTop: 2,
        fontFamily: "ProductSans-Bold",
        fontSize: 18
    }
});
