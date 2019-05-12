import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { ListItemComponent } from "./ListItemComponent";
import { calculatedHeight } from "../utils/";
import { Color } from "../res/";

class HorizontalListComponent extends React.PureComponent {
    onPressListItem = value => {
        this.props.navigation.navigate("ItemDetail", {
            data: value
        });
    };
    _renderItem = value => {
        let item = value.item;
        return <ListItemComponent data={item} onPressItem={() => this.onPressListItem(item)} />;
    };
    _keyExtractor = (item, index) => item.id;
    render() {
        let { title, data, onPressSeeAll } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={onPressSeeAll}>
                        <Text style={styles.btnSeeAll}>See all</Text>
                    </TouchableOpacity>
                </View>
                {data != undefined && data.length != 0 ? (
                    <FlatList
                        contentContainerStyle={{ marginTop: 10 }}
                        horizontal={true}
                        overScrollMode="never"
                        showsHorizontalScrollIndicator={false}
                        data={data}
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
        marginTop: 12,
        marginBottom: 12
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontFamily: "ProductSans-Regular",
        fontSize: 24
    },
    btnSeeAll: {
        fontFamily: "ProductSans-Regular",
        fontSize: 20,
        color: Color.mayaBlue
    },
    textError: {
        color: "grey",
        fontFamily: "ProductSans-Bold",
        fontSize: 18,
        marginTop: calculatedHeight(2)
    }
});

export { HorizontalListComponent };
