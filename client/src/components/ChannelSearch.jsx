import React from 'react';
import { useState, useEffect } from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';

//Icon
import { SearchIcon } from '../assets';

const ChannelSearch = () => {
	const [querry, setQuerry] = useState('');
	const [loading, setLoading] = useState(false);

	const getChannels = async (text) => {
		try {
			//TODO: Fetch Channels
		} catch {
			setQuerry(' ');
		}
	};

	const onSearch = (event) => {
		event.preventDefault();

		setLoading(true);
		setQuerry(event.target.value);
		getChannels(event.target.value);
	};

	return (
		<div className='channel-search__container'>
			<div className='channel-search__input__wrapper'>
				<div className='channel-search__input__icon'>
					<SearchIcon />
				</div>
				<input
					type='text'
					placeholder='search'
					value={querry}
					onChange={onSearch}
					className='channel-search__input__text'
				/>
			</div>
		</div>
	);
};

export default ChannelSearch;
