import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  RefreshControl,
} from "react-native";

import { List, ListItem } from "../components/List";
import { geoFetch } from "../util/api";

class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      list: [],
      ////////////////////////////////////
      //added refreshing for handlerefresh
      refreshing: false,
    };
  }

  ////////////////////////////////////////
  //This code was in componentDidMount()
  //Just took it out
  makeRemoteRequest = () => {
    geoFetch("/geocache/list")
      .then((response) => {
        this.setState({
          loading: false,
          list: response.result,
          //////////////////////////
          //when done, stop freshing
          refreshing: false,
        });
      })
      .catch((error) => {
        console.log("list error", error);
        //    this.setState({ loading: false, refreshing: false });
      });
  };

  componentDidMount() {
    ///////////////////////////////
    //took out the medthod
    this.makeRemoteRequest();
  }

  ///////////////////////////////////
  //aded function to handle refresh
  handleRefresh = () => {
    this.setState(
      {
        /////////////////////
        //start frefreshing
        refreshing: true,
      },
      () => {
        //////////////////////////
        //calls to fetch new data
        this.makeRemoteRequest();
      }
    );
  };

  render() {
    if (this.state.loading) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <FlatList
        data={this.state.list}
        renderItem={({ item, index }) => (
          <ListItem
            title={item.title}
            isOdd={index % 2}
            onPress={() => this.props.navigation.navigate("Details", { item })}
          />
        )}
        keyExtractor={(item) => item.title}
        /////////////////////////////////////////////////////
        //refreshing to set refresh to update refresh status
        refreshing={this.state.refreshing}
        //onRefresh calls method to
        onRefresh={this.handleRefresh}
      />
    );
  }
}

export default ListScreen;

// <ScrollView>
//   refreshControl={<RefreshControl onRefresh={this.handleRefresh} />}
// <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
//   <FlatList
//     data={this.state.list}
//     renderItem={({ item, index }) => (
//       <ListItem
//         title={item.title}
//         isOdd={index % 2}
//         onPress={() =>
//           this.props.navigation.navigate("Details", { item })
//         }
//         onRefresh={this.handleRefresh}
//       />
//     )}
//     keyExtractor={(item) => item.title}
//   />
// </List>
//     </ScrollView>

//  <List>
