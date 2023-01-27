const userInfo = document.querySelector('#userInfo');

// song lists on different pages
const songLists = {
	allSongs: document.querySelector('#home-songs'),
	filteredSongs: document.querySelector('#search-songs'),
	likedSongs: document.querySelector('#likes-songs'),
};

// main content sections
const sections = {
	login: document.querySelector('#login-content'),
	home: document.querySelector('#home-content'),
	search: document.querySelector('#search-content'),
	likes: document.querySelector('#likes-content'),
	profile: document.querySelector('#profile-content'),
};

// nav buttons
const buttons = {
	home: document.querySelector('#nav-home'),
	search: document.querySelector('#nav-search'),
	likes: document.querySelector('#nav-likes'),
	profile: document.querySelector('#header-profile'),
	back: document.querySelector('#header-back'),
};

// login form elements
const loginForm = document.querySelector('form#login');
const usernameGroup = document.querySelector('form#login div.username');
const emailGroup = document.querySelector('form#login div.email');
const passwordGroup = document.querySelector('form#login div.password');
const repeatPasswordGroup = document.querySelector('form#login div.repeatPassword');
const submitButton = document.querySelector('#complete');
const toggleButton = document.querySelector('#toggle');
const logoutButton = document.querySelector('#logout');

// edit form elements
const editForm = document.querySelector('form#edit-profile');
const editFormContent = document.querySelector('div#edit-profile-content');
const editUsernameGroup = document.querySelector('form#edit-profile div.username');
const editEmailGroup = document.querySelector('form#edit-profile div.email');
const editOldPasswordGroup = document.querySelector('form#edit-profile div.oldPassword');
const editPasswordGroup = document.querySelector('form#edit-profile div.password');
const editRepeatPasswordGroup = document.querySelector('form#edit-profile div.repeatPassword');
const editButton = document.querySelector('form#edit-profile button#edit');
const editToggle = document.querySelector('#edit-toggle');

// search form elements
const searchForm = document.querySelector('form#search');
const nameGroup = document.querySelector('form#search div.name');
const languageGroup = document.querySelector('form#search div.language');
const genreGroup = document.querySelector('form#search div.genre');
const searchButton = document.querySelector('form#search button');

// notifications container
const notificationsContainer = document.querySelector('#notifications-container');

// controlling the header background
const header = document.querySelector('#header');
const mainContent = document.querySelector('#content-wrapper');

const state = {
	history: ['home', 'login'],
	userData: {},
	isLoginShowing: true,
	songs: {
		allSongs: [],
		filteredSongs: [],
		likedSongs: [],
	},
	errorState: {
		element: document.querySelector('#error'),
		content: '',
		showing: false,
		hideTime: Date.now(),
	},
	messageState: {
		element: document.querySelector('#message'),
		content: '',
		showing: false,
		hideTime: Date.now(),
	},
};

// returns user or false
const getCurrentUser = () => (JSON.stringify(state.userData) === '{}' ? false : state.userData);

const escapeHtml = (input) => input?.replace(/</g, '&lt;').replace(/>/g, '&gt;') ?? undefined;

// const unescapeHtml = (input) => input?.replace(/&lt;/g, '<').replace(/&gt;/g, '>') ?? undefined;

const escapeObjValues = (obj) =>
	Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, escapeHtml(val)]));

const removeEmpties = (obj) =>
	Object.fromEntries(Object.entries(obj).filter(([key, val]) => !!val));

const requireLogin = (userCallback, noUserCallback = undefined) => {
	if (!getCurrentUser()) {
		showMessage(state.errorState, `Please log in to continue!`);
		return noUserCallback ? noUserCallback() : undefined;
	}
	userCallback();
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Rendering functions

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const createHtmlElement = (type, content = '', classes = [], id = '') => {
	const element = document.createElement(type);
	if (typeof content === 'Node') {
		element.appendChild(content);
	} else {
		element.textContent = content === '' ? null : content;
	}
	if (classes.length > 0) element.classList.add(...classes);
	if (id !== '') element.id = id;
	return element;
};

const createSpan = (content, classes, id) => {
	return createHtmlElement('span', content, classes, id);
};
const createDiv = (content, classes, id) => {
	return createHtmlElement('div', content, classes, id);
};
const createButton = (content, classes, id) => {
	return createHtmlElement('button', content, classes, id);
};

// const createLi = (key, val) => {
// 	val = joinValue(val);
// 	return createHtmlElement('li', `${key}: ${val}`);
// };

const createLiRow = (key, val) => {
	const li = createHtmlElement('li');
	li.appendChild(key);
	li.appendChild(val);
	return li;
};

const joinValue = (val) => {
	if (typeof val === 'object') {
		return val.join(', ');
	}
	return val;
};

const createOption = (value, content, classes, id) => {
	const option = createHtmlElement('option', content, classes, id);
	option.value = value;
	return option;
};

const createSongRow = (song) => {
	const songRow = createDiv(null, ['songItem'], `song-${song._id}`);
	// const titleContainer = ;
	const cols = [
		createDiv(song.title, ['title', 'large']),
		createSongButtons(song),
		createSongRightCol(song),
	];
	cols.forEach((col) => songRow.appendChild(col));
	return songRow;

	// const wrapper = createDiv(null, ['songItem-container']);
	// wrapper.appendChild(songRow);
	// return wrapper;
};

const createSongRightCol = (song) => {
	const artistInfoContainer = createDiv('', ['rightCol']);
	const col2Contents = [
		createDiv('Artist:', ['artist', 'key', 'small']),
		createDiv(song.artistName, ['artist', 'val', 'small']),
		createDiv('Genre:', ['genre', 'key', 'small']),
		createDiv(song.genre, ['genre', 'val', 'small']),
		createDiv('Language:', ['language', 'key', 'small']),
		createDiv(song.language, ['language', 'val', 'small']),
		createDiv('Likes:', ['likes', 'key', 'small']),
		createDiv(song.likedBy.length, ['likes', 'val', 'small']),
	];
	col2Contents.forEach((content) => artistInfoContainer.appendChild(content));
	return artistInfoContainer;
};

const createSongButtons = (song) => {
	const isSongLikedByCurrentUser = song?.likedBy.includes(state.userData._id) ?? false;
	const isUserFollowingArtist = state.userData?.followedArtists?.includes(song.artist) ?? false;

	// const songInfoContainer = createDiv(null, ['leftCol']);
	const buttonContainer = createDiv(null, ['buttons-container']);
	const buttons = [
		createButton(
			isSongLikedByCurrentUser ? 'UnLike Song' : 'Like Song',
			isSongLikedByCurrentUser ? ['liked'] : [],
			`like-${song._id}`
		),
		createButton(
			isUserFollowingArtist ? 'UnFollow Artist' : 'Follow Artist',
			isUserFollowingArtist ? ['followed'] : [],
			`follow-${song.artist}`
		),
	];
	buttons.forEach((button) => buttonContainer.appendChild(button));
	// const contents = [createDiv(song.title, ['title', 'large']), buttonContainer];
	// contents.forEach((content) => songInfoContainer.appendChild(content));

	return buttonContainer;
};

// helpers
const clearChildren = (element) => {
	while (element.firstElementChild) {
		element.removeChild(element.firstElementChild);
	}
};

const renderAllSongLists = () => {
	const destinations = ['allSongs', 'likedSongs', 'filteredSongs'];
	for (let i = 0; i < destinations.length; i++) {
		renderSongList(destinations[i]);
	}
};

const renderSongList = (destination) => {
	clearChildren(songLists[destination]);

	state.songs[destination].forEach((song) =>
		songLists[destination].appendChild(createSongRow(song))
	);
};

const renderCurrentUser = () => {
	clearChildren(userInfo);

	Object.entries(state.userData).forEach(([key, val]) => {
		const liKey = createSpan(`${key}:`, ['li-key']);
		const liValue = createSpan(joinValue(val), ['li-val']);
		// const li = createLiRow(liKey, liValue);
		userInfo.appendChild(liKey);
		userInfo.appendChild(liValue);
	});
};

const logInUser = (user) => {
	state.userData = user;
	buttons.profile.textContent = 'Profile';
	logoutButton.style.display = 'block';
	sections.profile.querySelector('h1').textContent = state.userData.username;
	getLikedSongs();
};

const logOutUser = () => {
	state.userData = {};
	buttons.profile.textContent = 'Log In';
	state.songs.likedSongs = [];
	logoutButton.style.display = 'none';
	sections.likes.querySelector('.subtitle').textContent = '';
	sections.profile.querySelector('h1').textContent = 'Please Log In';
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Changing content views

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const prevView = () => {
	const current = state.history.pop();
	const prev = state.history[state.history.length - 1];
	console.log('going back to:', { prev });
	showView(prev);
};

const nextView = (view = 'home') => {
	console.log('going to', view);
	const isNotPreviousPageSameAsNext = state.history[state.history.length - 1] != view;
	if (isNotPreviousPageSameAsNext) {
		state.history.push(view);
	}
	showView(view);
};

// button highlight
const switchActive = (view = 'home') => {
	buttons.home.classList.remove('active');
	buttons.search.classList.remove('active');
	buttons.likes.classList.remove('active');
	if (view === 'home' || view === 'search' || view === 'likes') {
		buttons[view].classList.add('active');
	}
};

// switching views for main content
const showView = (view = 'home') => {
	switchActive(view);
	sections.home.style.display = 'none';
	sections.search.style.display = 'none';
	sections.likes.style.display = 'none';
	sections.login.style.display = 'none';
	sections.profile.style.display = 'none';

	sections[view].style.display = 'flex';
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// for notifications

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const showMessage = (object, message, seconds = 5) => {
	// seconds = 99999;
	console.log('show a message box');
	const ms = seconds * 1000;
	object.element.lastElementChild.textContent = message;
	object.element.style.visibility = 'visible';
	object.element.classList.add('showing');
	object.hideTime = Date.now() + ms;
	object.showing = true;
};

const hideMessage = (object) => {
	console.log('hide the message box');
	object.element.lastElementChild.textContent = '';
	object.element.style.visibility = 'hidden';
	object.element.classList.remove('showing');
	object.showing = false;
};

// simple timer to allow me to hide messages/errors after a while
setInterval(() => {
	if (state.errorState.showing) {
		const timeToHide = Date.now() > state.errorState.hideTime;
		if (timeToHide) {
			hideMessage(state.errorState);
		}
	}

	if (state.messageState.showing) {
		const timeToHide = Date.now() > state.messageState.hideTime;
		if (timeToHide) {
			hideMessage(state.messageState);
		}
	}
}, 1000);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Song actions

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// TODO: needs to handle unlike also
const songAction = async (action, target, isRemoving, id, title) => {
	console.log(action === 'like' ? 'toggle like song!' : 'toggle follow artist!', id);

	const path = action === 'like' ? `/songs/${id}` : `/artists/${id}`;
	const className = action === 'like' ? 'liked' : 'followed';
	const verb =
		action === 'like' ? `${isRemoving ? 'un' : ''}like` : `${isRemoving ? 'un' : ''}follow`;

	const consolePartMessage = action === 'like' ? `${verb}d song` : `${verb}ed artist`;
	const message =
		action === 'like' ? `Song ${title} is ${verb}d!` : `Artist ${title} is ${verb}ed!`;

	try {
		// do put request to url
		const fetchPromise = fetch(location.origin + path, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// immediate feedback?
		if (isRemoving) {
			target.classList.remove(className);
			target.textContent = action === 'like' ? 'Like Song' : 'Follow Artist';
		} else {
			target.classList.add(className);
			target.textContent = action === 'like' ? 'UnLike Song' : 'UnFollow Artist';
		}
		showMessage(state.messageState, message, 3);

		const res = await fetchPromise;
		if (!res.ok) throw 'response not ok';

		const json = await res.json();
		console.log(consolePartMessage + ` ${title}: res.ok!`, { res, json });
		state.userData = json.user;
		updateLikesAndFollowsCount();

		if (action === 'like') {
			getAllSongs();
			getLikedSongs();
		} else {
			// refresh all the lists for artist follow buttons
			renderAllSongLists();
		}
	} catch (error) {
		console.log(consolePartMessage + `: error:`, { error });

		if (state.messageState.showing) hideMessage(state.messageState);
		showMessage(state.errorState, `${consolePartMessage} failed: ${error}`);

		if (isRemoving) {
			target.classList.add(className);
			target.textContent = action === 'like' ? 'UnLike Song' : 'UnFollow Artist';
		} else {
			target.classList.remove(className);
			target.textContent = action === 'like' ? 'Like Song' : 'Follow Artist';
		}
	}
};

const likeSong = async (target, songId, songTitle) => {
	const isLiked = target.classList.contains('liked');
	console.log({ target, isLiked });
	songAction('like', target, isLiked, songId, songTitle);
};

const followArtist = async (target, artistId, artistName) => {
	const isFollowed = target.classList.contains('followed');
	console.log({ target, isFollowed });
	songAction('follow', target, isFollowed, artistId, artistName);
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//		Login/Register form

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// login / register
const sendForm = async () => {
	const actionString = state.isLoginShowing ? 'Login' : 'Register';
	console.log(`sending form: ${actionString}`);

	//if login, require username OR email
	const formData = {
		username: usernameGroup.lastElementChild.value || undefined,
		password: passwordGroup.lastElementChild.value || undefined,
		email: emailGroup.lastElementChild.value || undefined,
		repeatPassword: repeatPasswordGroup.lastElementChild.value || undefined,
	};
	console.log({ formData });

	try {
		if (state.isLoginShowing) {
			// missing both
			const isMissingUsernameAndEmail = !formData.username && !formData.email;
			if (isMissingUsernameAndEmail) throw 'Username or Email is required';
		} else {
			if (formData.password !== formData.repeatPassword) throw 'Passwords do not match!';
		}

		// remove repeatPassword
		const body = {
			username: formData.username,
			email: formData.email,
			password: formData.password,
		};

		const escapedData = escapeObjValues(removeEmpties(body));
		console.log('final data:', { escapedData });

		const loginRes = await fetch(location.origin + `/user/${actionString.toLowerCase()}`, {
			method: 'POST',
			body: JSON.stringify(escapedData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		console.log({ loginRes });

		if (!loginRes.ok) throw loginRes.statusText;
		const { user } = await loginRes.json();

		logInUser(user);

		showMessage(state.messageState, `${actionString} successful!`, 10);
		console.log(`${actionString} successful!`, { loginRes, user, userData: state.userData });
		renderCurrentUser();
		getAllSongs();
		updateLikesAndFollowsCount();
		nextView('home');
	} catch (err) {
		console.error(`${actionString} error:`, err);
		showMessage(state.errorState, `${actionString} error: ${err}`, 10);
	}
};

// runs when song action, or when logs in
const updateLikesAndFollowsCount = () => {
	sections.likes.querySelector(
		'.subtitle'
	).textContent = `${state.userData.username} | ${state.songs.likedSongs.length} liked songs`;
	sections.profile.querySelector(
		'#following'
	).textContent = `${state.userData.followedArtists.length} Following`;
};

const logout = async () => {
	try {
		const logoutRes = await fetch(location.origin + `/user/logout`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!logoutRes.ok) throw logoutRes.statusText;

		console.log('Logout successful!');
		showMessage(state.messageState, `Success logging out!`, 5);

		logOutUser();
		renderCurrentUser();
		nextView('login');
		getAllSongs();
	} catch (err) {
		console.error(err);
		showMessage(state.errorState, `Error logging out!`, 5);
	}
};

const toggleLoginRegister = () => {
	if (state.isLoginShowing) {
		switchToRegister();
	} else {
		switchToLogin();
	}
};

const switchToRegister = () => {
	state.isLoginShowing = false;
	emailGroup.style.display = 'block';
	emailGroup.lastElementChild.required = true;
	repeatPasswordGroup.style.display = 'block';
	repeatPasswordGroup.lastElementChild.required = true;
	usernameGroup.lastElementChild.required = true;

	toggleButton.textContent = 'Trying to Log In?';
	submitButton.textContent = 'Register';
	sections.login.firstElementChild.firstElementChild.textContent = 'Register';
	sections.login.firstElementChild.lastElementChild.textContent = 'Register a new account';
};

const switchToLogin = () => {
	state.isLoginShowing = true;
	emailGroup.lastElementChild.required = false;
	repeatPasswordGroup.style.display = 'none';
	repeatPasswordGroup.lastElementChild.required = false;
	usernameGroup.lastElementChild.required = false;

	toggleButton.textContent = 'Trying to Register?';
	submitButton.textContent = 'Log In';
	sections.login.firstElementChild.firstElementChild.textContent = 'Log In';
	sections.login.firstElementChild.lastElementChild.textContent =
		'Use your account email or account name';
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// 		Edit profile form

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const toggleEdit = (forceHide = false) => {
	if (forceHide) {
		editFormContent.style.display = 'none';
	} else {
		if (editFormContent.style.display === 'grid') {
			editFormContent.style.display = 'none';
		} else {
			editFormContent.style.display = 'grid';
		}
	}
};

editToggle.addEventListener('click', (e) => {
	toggleEdit();
});

const sendEdit = () => {
	console.log('sending edit!');
	// get the datas from the inputs
	const data = {
		username: editUsernameGroup.lastElementChild.value,
		email: editEmailGroup.lastElementChild.value,
		oldPassword: editOldPasswordGroup.lastElementChild.value,
		password: editPasswordGroup.lastElementChild.value,
		repeatPassword: editRepeatPasswordGroup.lastElementChild.value,
	};
	console.log({ data });

	if (data.password !== data.repeatPassword) {
		console.error('Error: new passwords do not match!');
		showMessage(state.errorState, 'Error: new passwords do not match!', 5);
		return;
	}

	const body = {
		username: escapedData.username,
		email: escapedData.email,
		oldPassword: escapedData.oldPassword,
		password: escapedData.password,
	};

	const noEmpties = removeEmpties(body);
	console.log({ noEmpties });

	const escapedData = escapeObjValues(noEmpties);
	console.log({ escapedData });

	// send it
	fetch(location.origin + `/user/info`, {
		method: 'PUT',
		body: JSON.stringify(escapedData),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((r) => {
			if (!r.ok) throw 'Response not OK';
			return r.json();
		})
		.then((res) => {
			console.log('Edit result:', { res });
			showMessage(state.messageState, 'Success! Settings changed!');
			// clear fields
			editUsernameGroup.lastElementChild.value = '';
			editEmailGroup.lastElementChild.value = '';
			editOldPasswordGroup.lastElementChild.value = '';
			editPasswordGroup.lastElementChild.value = '';
			editRepeatPasswordGroup.lastElementChild.value = '';

			// updateProfileInfo();
		})
		.catch((err) => {
			showMessage(state.errorState, err, 10);
			console.log('error putting user/info:', err);
		});
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// fetching songs functions

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// helper function
const fetchSongs = (path, notOkMessage, onFulfilled, onRejected) =>
	fetch(location.origin + path, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((r) => {
			if (!r.ok) throw `${notOkMessage}: ${r.statusText}`;
			return r.json();
		})
		.then(onFulfilled)
		.catch(onRejected);

const getAllSongs = () => {
	fetchSongs(
		'/songs/all',
		'get songs NOT ok',
		({ allSongs }) => {
			console.log('Success getting all songs!', { allSongs });
			state.songs.allSongs = allSongs;
			renderSongList('allSongs');
		},
		(error) => {
			showMessage(state.errorState, error, 10);
			console.log('error getting /songs/all', error);
		}
	);
};

const getLikedSongs = async () => {
	fetchSongs(
		'/user/songs',
		'Error fetching liked songs for this user!',
		({ likedSongs }) => {
			// render into our list
			state.songs.likedSongs = likedSongs;
			console.log({ likedSongs });
			renderSongList('likedSongs');
			showMessage(state.messageState, `Retrieved liked songs! ${likedSongs.length} results!`, 10);
			updateLikesAndFollowsCount();
		},
		(error) => {
			console.error(`getLikedSongs error: ${error}`);
			showMessage(state.errorState, `getLikedSongs error: ${error}`, 10);
		}
	);
};

const buildQueryString = (queryObj) => {
	const query = [];
	for (const key in queryObj) {
		if (queryObj[key] !== '')
			query.push(encodeURIComponent(key) + '=' + encodeURIComponent(queryObj[key]));
	}
	const path = `${query.length > 0 ? `?${query.join('&')}` : ''}`;
	return path;
};

const sendSearch = (destination, useQuery = true) => {
	console.log(useQuery ? 'sending search query!' : 'fetching all songs (sendSearch())');

	let queryPath = ''; // empty by default
	if (useQuery) {
		const query = {
			search: nameGroup.lastElementChild.value,
			language: languageGroup.lastElementChild.value,
			genre: genreGroup.lastElementChild.value,
		};
		const escapedQuery = escapeObjValues(query);
		queryPath = buildQueryString(escapedQuery);
		console.log('using query:', { query, escapedQuery, queryPath });
	}

	fetchSongs(
		`/songs${queryPath}`,
		'query response NOT ok',
		({ foundSongs }) => {
			console.log('success fetching query!', { foundSongs });
			if (useQuery)
				showMessage(
					state.messageState,
					`Query results received! ${foundSongs.length} results!`,
					10
				);
			// "filteredSongs, allSongs, or likedSongs"
			state.songs[destination] = foundSongs;
			renderSongList(destination);
		},
		(error) => {
			showMessage(state.errorState, error, 10);
			console.log('error querying /songs', error);
		}
	);
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Click listeners setup

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// handles ALL the Like Song and Follow Artist buttons on (right-half) songList
const songActionHandler = async (e) => {
	console.log({ target: e?.target }); // #home-songs.songs-grid
	const [action, docId] = e?.target?.id.split('-');

	switch (action) {
		case 'like':
			const songTitle = e.target.parentElement.parentElement.firstElementChild.textContent;
			requireLogin(() => likeSong(e.target, docId, songTitle));
			break;

		case 'follow':
			const artistName =
				e.target.parentElement.parentElement.parentElement.lastElementChild.querySelector(
					'div.artist'
				).textContent;
			requireLogin(() => followArtist(e.target, docId, artistName));
			break;
	}
};
songLists.allSongs.addEventListener('click', songActionHandler);
songLists.filteredSongs.addEventListener('click', songActionHandler);
songLists.likedSongs.addEventListener('click', songActionHandler);

toggleButton.addEventListener('click', (e) => {
	e.preventDefault();
	toggleLoginRegister();
});

// sendForm login and register
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();
	sendForm();
});

logoutButton.addEventListener('click', (e) => {
	e.preventDefault();
	logout();
});

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	requireLogin(() => sendSearch('filteredSongs'));
});

editForm.addEventListener('submit', (e) => {
	e.preventDefault();
	requireLogin(sendEdit);
});

// x out of notifications
notificationsContainer.addEventListener('click', (e) => {
	if (e.target.nodeName === 'BUTTON') {
		// console.log(e.target);
		if (e.target.parentElement.id === 'message') {
			hideMessage(state.messageState);
		} else if (e.target.parentElement.id === 'error') {
			hideMessage(state.errorState);
		}
	}
});

mainContent.addEventListener('scroll', (e) => {
	// console.log('pageYOffset:', window.pageYOffset);
	if (mainContent.scrollTop > 0) {
		header.classList.add('transparent');
	} else {
		header.classList.remove('transparent');
	}
});

window.addEventListener('click', (e) => {
	const parent = e.target.parentElement;
	const grandparent = parent.parentElement;

	// if clicked inside or on our button:
	if (e.target === buttons.home || parent === buttons.home || grandparent === buttons.home) {
		nextView('home');
	} else if (
		e.target === buttons.search ||
		parent === buttons.search ||
		grandparent === buttons.search
	) {
		requireLogin(
			() => nextView('search'),
			() => nextView('login')
		);
	} else if (
		e.target === buttons.likes ||
		parent === buttons.likes ||
		grandparent === buttons.likes
	) {
		requireLogin(
			() => nextView('likes'),
			() => nextView('login')
		);
	} else if (e.target === buttons.back) {
		prevView();
	} else if (e.target === buttons.profile) {
		console.log('going profile button');
		if (!getCurrentUser()) {
			switchToLogin();
			nextView('login');
		} else {
			toggleEdit(true);
			nextView('profile');
		}
	}
});

// to fetch songs on load:
window.addEventListener('load', async (e) => {
	getAllSongs();
});
