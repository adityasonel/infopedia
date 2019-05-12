import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { UiStatusBar } from "../component";
import { viewTopPadding, calculatedHeight } from "../utils";
import { ListItemComponent } from "../component/";

export default class FullListScreen extends React.PureComponent {
    onPressBack = () => {
        this.props.navigation.goBack();
    };
    onPressListItem = value => {
        this.props.navigation.navigate("ItemDetail", {
            data: value
        });
    };
    _renderItem = value => {
        let item = value.item;
        return <ListItemComponent data={item} isVerticalList={true} onPressItem={() => this.onPressListItem(item)} />;
    };
    _keyExtractor = (item, index) => item.id;
    render() {
        let data = this.props.navigation.getParam("data", "");
        let results = data.results;
        return (
            <View style={styles.container}>
                <UiStatusBar backgroundColor="white" barStyle="dark-content" />
                <TouchableOpacity onPress={this.onPressBack}>
                    <Icon name="ios-arrow-back" size={30} color="black" />
                </TouchableOpacity>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textheader}>
                    {data.title}
                </Text>

                {results != undefined && results.length != 0 ? (
                    <FlatList
                        style={{ paddingBottom: 20 }}
                        overScrollMode="never"
                        showsVerticalScrollIndicator={false}
                        data={results}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        getItemLayout={(data, index) => ({ length: calculatedHeight(28), offset: calculatedHeight(28) * index, index })}
                    />
                ) : (
                    <Text style={styles.textError}>Oops some error occured!</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: viewTopPadding
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
