import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { useState } from 'react';

//Components
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

//Icons
import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({ logout }) => (
	<div className='channel-list__sidebar'>
		<div className='channel-list__sidebar__icon1'>
			<div className='icon1__inner'>
				<img
					src={HospitalIcon}
					alt='Hospital'
					width='30'
				/>
			</div>
		</div>
		<div className='channel-list__sidebar__icon2'>
			<div
				className='icon1__inner'
				onClick={logout}>
				<img
					src={LogoutIcon}
					alt='log out'
					width='30'
				/>
			</div>
		</div>
	</div>
);

const CompanyHeader = () => (
	<div className='channel-list__header'>
		<p className='channel-list__header__text'>Chat Application</p>
	</div>
);

const customChannelTeamFilter = (channels) => {
	return channels.filter((channel) => channel.type === 'team');
};
const customChannelMessagingFilter = (channels) => {
	return channels.filter((channel) => channel.type === 'messaging');
};

const ChannelListContent = ({
	setToggleContainer,
	setIsCreating,
	setCreateType,
	setIsEditing,
}) => {
	const { client } = useChatContext();

	const logout = () => {
		cookies.remove('userId');
		cookies.remove('username');
		cookies.remove('fullName');
		cookies.remove('avatarURL');
		cookies.remove('hashedPassword');
		cookies.remove('phoneNumber');
		cookies.remove('token');

		window.location.reload();
	};

	const filters = { members: { $in: [client.userID] } };

	return (
		<>
			<SideBar logout={logout} />
			<div className='channel-list__list__wrapper'>
				{' '}
				<CompanyHeader />
				<ChannelSearch setToggleContainer={setToggleContainer} />
				<ChannelList
					filters={filters}
					channelRenderFilterFn={customChannelTeamFilter}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type='team'
							setIsCreating={setIsCreating}
							setCreateType={setCreateType}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							type='team'
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
						/>
					)}
				/>
				<ChannelList
					filters={filters}
					channelRenderFilterFn={customChannelMessagingFilter}
					List={(listProps) => (
						<TeamChannelList
							{...listProps}
							type='messaging'
							setIsCreating={setIsCreating}
							setCreateType={setCreateType}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
						/>
					)}
					Preview={(previewProps) => (
						<TeamChannelPreview
							{...previewProps}
							type='messaging'
							setIsCreating={setIsCreating}
							setIsEditing={setIsEditing}
							setToggleContainer={setToggleContainer}
						/>
					)}
				/>
			</div>
		</>
	);
};

const ChannelListContainer = ({
	setIsCreating,
	setCreateType,
	setIsEditing,
}) => {
	const [toggleContainer, setToggleContainer] = useState(false);
	return (
		<>
			<div className='channel-list__container'>
				<ChannelListContent
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
				/>
			</div>
			<div
				className='channel-list__container-responsive'
				style={{
					left: toggleContainer ? '0%' : '-89%',
					background: '#005FFF',
				}}>
				<div
					className='channel-list__container-toggle'
					onClick={() =>
						setToggleContainer((prevToggleContainer) => !prevToggleContainer)
					}></div>
				<ChannelListContent
					setIsCreating={setIsCreating}
					setCreateType={setCreateType}
					setIsEditing={setIsEditing}
					setToggleContainer={setToggleContainer}
				/>
			</div>
		</>
	);
};

export default ChannelListContainer;
