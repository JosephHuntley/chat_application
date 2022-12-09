import React from 'react';
import { Channel, useChatContext } from 'stream-chat-react';

// Components
import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({
	createType,
	isEditing,
	setIsEditing,
	isCreating,
	setIsCreating,
}) => {
	const { channel } = useChatContext();
	if (isCreating) {
		return (
			<div className='channel__container'>
				<CreateChannel
					createType={createType}
					setIsCreating={setIsCreating}
				/>
			</div>
		);
	}
	if (isEditing) {
		return (
			<div className='channel__container'>
				<EditChannel setIsEditing={setIsEditing} />
			</div>
		);
	}

	const EmptyState = () => (
		<div className='channel-empty__container'>
			<p className='channel-empty__first'>
				This is the beginning of you chat history
			</p>
			<p className='channel-empty__second'>
				Send messages, attachments, links, emojis, and more!
			</p>
		</div>
	);

	return (
		<div className='channel__container'>
			<Channel
				EmptyStateIndicator={EmptyState}
				//MessageText is a stream func used to display the message
				//Message = {(messageProps, index) => <ChannelInner key={index} {...messageProps} /> }
			>
				<ChannelInner setIsEditing={setIsEditing} />
			</Channel>
		</div>
	);
};

export default ChannelContainer;
