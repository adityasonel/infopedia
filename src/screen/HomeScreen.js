import React from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { connect } from "react-redux";
import { UiStatusBar, HorizontalListComponent } from "../component";
import { viewTopPadding, calculatedHeight, URL } from "../utils";
import { fetchListAction } from "../action/";
import { Color } from "../res/";
import NetInfo from "@react-native-community/netinfo";

let index = 0;
let urlsLength = URL.length - 1;

class HomeScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            feed: [],
            titleArray: [],
            isDataAvailable: false,
            showListFooter: true,
            isNetworkAvailable: true
        };
    }
    _networkListener = data => {
        if (data.type == "none") {
            this.setState({
                isNetworkAvailable: false
            });
        } else {
            this.setState({
                isNetworkAvailable: true
            });
        }
    };
    onPressSeeAll = value => {
        this.props.navigation.navigate("FullList", {
            data: value
        });
    };
    _fetchList = () => {
        if (index <= urlsLength) {
            this.props.fetchList(URL[index]);
            index = index + 1;
        } else {
            this.state.showListFooter = false;
            index = 0;
        }
    };
    componentDidMount() {
        networkSubscription = NetInfo.addEventListener("connectionChange", this._networkListener);
        if (this.state.isNetworkAvailable) {
            this._fetchList();
        } else {
            this.setState({
                isDataAvailable: false
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.response !== this.props.response && nextProps.response.data != undefined) {
            this._fetchList();

            let title = nextProps.response.data.feed.title;
            let feed = nextProps.response.data.feed;
            this.setState({
                isDataAvailable: true,
                feed: [...this.state.feed, feed],
                titleArray: [...this.state.titleArray, title]
            });
        }
    }
    _renderItem = value => {
        let item = value.item;
        return (
            <HorizontalListComponent
                title={item.title}
                data={item.results}
                onPressSeeAll={() => this.onPressSeeAll(item)}
                navigation={this.props.navigation}
            />
        );
    };
    _onRefresh = () => {
        this.setState({
            feed: [],
            titleArray: [],
            isDataAvailable: false,
            showListFooter: true
        });
        this._fetchList();
    };
    _renderItemEmptyView = () => {
        if (!this.state.isNetworkAvailable) {
            return <Text style={styles.textNoNetwork}>Please connect to working network connection!</Text>;
        } else if (!this.state.isDataAvailable) {
            return <ActivityIndicator size="large" color={Color.mayaBlue} hidesWhenStopped={true} style={{ flex: 1 }} />;
        }
    };
    _keyExtractor = (item, index) => item.id;
    render() {
        return (
            <View style={styles.container}>
                <UiStatusBar backgroundColor="white" barStyle="dark-content" />
                <Text style={styles.textheader}>Infopedia</Text>

                {this.state.isDataAvailable && this.state.isNetworkAvailable ? (
                    <FlatList
                        overScrollMode="never"
                        showsVerticalScrollIndicator={false}
                        data={this.state.feed}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        getItemLayout={(data, index) => ({ length: calculatedHeight(28), offset: calculatedHeight(28) * index, index })}
                        ListFooterComponent={
                            <ActivityIndicator
                                style={{ marginTop: 16 }}
                                size="large"
                                color={Color.mayaBlue}
                                hidesWhenStopped={true}
                                animating={this.state.showListFooter}
                            />
                        }
                        ListEmptyComponent={<Text style={styles.textNoNetwork}>Some error occured, Please try again!</Text>}
                        refreshControl={
                            <RefreshControl
                                colors={[Color.mayaBlueDark, Color.mayaBlue]}
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    />
                ) : (
                    <View style={{ flex: 1 }}>{this._renderItemEmptyView()}</View>
                )}
            </View>
        );
    }
    componentWillUnmount() {
        NetInfo.removeEventListener("connectionChange", this._networkListener);
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
        fontSize: 38,
        paddingBottom: 8
    },
    textNoNetwork: {
        color: "grey",
        fontFamily: "ProductSans-Bold",
        fontSize: 22,
        marginTop: calculatedHeight(4)
    }
});

const mapStateToProps = store => {
    return {
        isFetching: store.listReducer.isFetching,
        response: store.listReducer.response,
        error: store.listReducer.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchList: value => {
            dispatch(fetchListAction(value, dispatch));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);
