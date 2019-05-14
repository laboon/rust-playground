import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import MenuGroup from './MenuGroup';
import SelectOne from './SelectOne';

import { changeChannel } from './actions';
import {
  betaVersionDetailsText,
  betaVersionText,
  nightlyVersionDetailsText,
  nightlyVersionText,
  stableVersionText,
  substrateVersionText,
  substrateVersionDetailsText,
} from './selectors';
import State from './state';
import { Channel } from './types';

interface ChannelMenuProps {
  channel: Channel;
  changeChannel: (_: Channel) => any;
  stableVersion: string;
  substrateVersion: string;
  substrateVersionDetails: string;
  betaVersion: string;
  nightlyVersion: string;
  betaVersionDetails: string;
  nightlyVersionDetails: string;
  close: () => void;
}

const ChannelMenu: React.SFC<ChannelMenuProps> = props => (
  <Fragment>
    <MenuGroup title="Channel &mdash; Choose the rust version">
      <SelectOne
        name="Substrate"
        currentValue={props.channel}
        thisValue={Channel.Substrate}
        changeValue={channel => { props.changeChannel(channel); props.close(); }}
      >
        <Desc>Build using the Substrate image: {props.nightlyVersion}</Desc>
        <Desc>({props.substrateVersionDetails})</Desc>
      </SelectOne>
    </MenuGroup>
  </Fragment>
);

const Desc: React.SFC<{}> = ({ children }) => (
  <p className="channel-menu__description">{children}</p>
);

const mapStateToProps = (state: State) => {
  const { configuration: { channel } } = state;

  return {
    channel,
    stableVersion: stableVersionText(state),
    substrateVersion: substrateVersionText(state),
    betaVersion: betaVersionText(state),
    nightlyVersion: nightlyVersionText(state),
    betaVersionDetails: betaVersionDetailsText(state),
    nightlyVersionDetails: nightlyVersionDetailsText(state),
    substrateVersionDetails: substrateVersionDetailsText(state),
  };
};

const mapDispatchToProps = {
  changeChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMenu);
