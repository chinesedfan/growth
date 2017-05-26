/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  View, Text, StyleSheet, Platform,
} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import * as shortid from 'shortid';

import AppColors from '../theme/colors';
import SECTIONS from '../constants/SECTIONS';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    margin: 10,
    height: 100,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});

class SuperCardView extends React.PureComponent {

  static renderContent(section, index, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="opacity"
        style={{ backgroundColor: (isActive ? 'rgba(238, 238, 238, 1.0)' : 'rgba(238, 238, 238, 1.0)') }}
      >
        <Animatable.View
          duration={300}
          easing="ease-out"
          animation={isActive ? 'zoomInUp' : ''}
        >
          <View
            style={{ backgroundColor: '#fff', marginLeft: 10, marginRight: 10 }}
          >
            {
              section.subSections.map(subSection => (
                <ListItem
                  key={shortid.generate()}
                  title={subSection.title}
                />
              ))
            }
          </View>
        </Animatable.View>
      </Animatable.View>
    );
  }

  static renderHeader(section, index, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="opacity"
        style={{ backgroundColor: (isActive ? 'rgba(238, 238, 238, 1.0)' : 'rgba(238, 238, 238, 1.0)') }}
      >
        <View style={styles.cardContainer}>
          <View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'column', margin: 15 }}>
                <View style={{ height: 40 }}>
                  <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 15 }}>
                    {section.title}
                  </Text>
                </View>
                <View style={{ height: 40 }}>
                  <Text style={{ marginTop: 5, marginBottom: 15 }}>
                    {section.description}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 100, alignItems: 'flex-end', left: -10 }}>
              <Icon size={100} name={'md-home'} type={'ionicon'} color={AppColors.brand.primary} />
            </View>
          </View>
        </View>
      </Animatable.View>
    );
  }

  constructor(props) {
    super(props);
    this.renderContent = SuperCardView.renderContent.bind(this);
    this.renderHeader = SuperCardView.renderHeader.bind(this);
  }

  componentName = 'SuperCardView';


  render() {
    return (
      <Accordion
        sections={SECTIONS}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
      />
    );
  }
}

export default SuperCardView;
