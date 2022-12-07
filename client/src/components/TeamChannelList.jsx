import React from 'react';
import { AddChannel } from '../assets';

const TeamChannelList = ({ childern, error = false, loading, type }) => {
	if (error) {
		return type === 'team' ? (
			<div className='team-channel-list'>
				<p className='team-channel-list__message'>
					Connection error, please wait and try again.
				</p>
			</div>
		) : null;
	}
	// * Checks if the channel list is still loading and if it is prints a message accordingly.
	if (loading) {
		return (
			<div className='team-channel-list'>
				<p className='team-channel-list__message loading'>
					{type === 'team' ? 'Channels' : 'Messages'} loading...
				</p>
			</div>
		);
	}
	return (
		<div className='team-channel-list'>
			<div className='team-channel-list__header'>
				<p className='team-channel-list__header__title'>
					{type === 'team' ? 'Channels' : 'Direct Messages'}
				</p>
			</div>
			{childern}
		</div>
	);
};

export default TeamChannelList;
