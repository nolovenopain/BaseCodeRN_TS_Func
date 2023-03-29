import React, {Dispatch, useState} from 'react';
import {Alert, StyleSheet, Switch, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {SearchBarCus} from '../Components';
import {width} from '../Constants';
import {ApplicationState, onChangeLanguage, store} from '../Redux';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const dispatch = store.dispatch as typeof store.dispatch | Dispatch<any>;
  const settingsState = useSelector(
    (state: ApplicationState) => state.settingsReducer,
  );

  const [isEnabled, setIsEnabled] = useState(
    settingsState.language == 'vi' ? false : true,
  );
  const [state, setstate] = useState('');

  const toggleSwitch = () => {
    if (isEnabled) {
      dispatch(onChangeLanguage('vi', true));
      setIsEnabled(false);
    } else {
      dispatch(onChangeLanguage('en', true));
      setIsEnabled(true);
    }
  };

  const onSubmitEditing = () => {
    Alert.alert('abc');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}></View>
      <View style={styles.body}>
        <Text>{isEnabled ? 'English' : 'Vietnamese'}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{marginBottom: 20}}
        />

        <SearchBarCus
          value={state}
          onTextChange={setstate}
          placeholder="search"
          containerStyle={{
            width: width - 40,
            borderWidth: 1,
            borderRadius: 10,
          }}
          leftIcon={true}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 1,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
  },
});
