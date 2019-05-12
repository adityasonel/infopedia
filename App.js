console.disableYellowBox = true;
import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Provider } from "react-redux";
import configureStore from "./src/store/store";
const store = configureStore();
import HomeScreen from "./src/screen/HomeScreen";
import FullListScreen from "./src/screen/FullListScreen";
import ItemDetailScreen from "./src/screen/ItemDetailScreen";

let AppStack = createStackNavigator(
    {
        Home: HomeScreen,
        FullList: FullListScreen,
        ItemDetail: ItemDetailScreen
    },
    {
        initialRouteName: "Home",
        headerMode: "none"
    }
);

let AppContainer = createAppContainer(AppStack);

export default class App extends React.PureComponent {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
