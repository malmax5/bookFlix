const SET_NAME = 'SET_BOOK_NAME';
const SET_AUTHOR = 'SET_AUTHOR';
const SET_DESCRIPTION = 'SET_DESCRIPTION';
const SET_DATE = 'SET_DATE';
const SET_GENRE = 'SET_GENRE';
const SET_NUMBER_PAGES = 'SET_NUMBER_PAGES';
const SET_LANGUAGE = 'SET_LANGUAGE';
const SET_RATING_BOOKFLIX = 'SET_RATING';
const SET_RATING_GOOGLE = 'SET_RATING_GOOGLE';

const initialState = {
    name: '',
    author: '',
    description: '',
    date: '',
    genre: '',
    numberOfPages: '',
    language: '',
    rating_bookflix: 0.0,
    rating_google: 0.0,
};

const bookPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case SET_AUTHOR:
            return {
                ...state,
                author: action.payload,
            };
        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
            };
        case SET_DATE:
            return {
                ...state,
                date: action.payload,
            };
        case SET_GENRE:
            return {
                ...state,
                genre: action.payload,
            };
        case SET_NUMBER_PAGES:
            return {
                ...state,
                numberOfPages: action.payload,
            };
        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            };
        case SET_RATING_BOOKFLIX:
            return {
                ...state,
                rating_bookflix: action.payload,
            };
        case SET_RATING_GOOGLE:
            return {
                ...state,
                rating_google: action.payload,
            };
        default:
            return state;
    }
};

export const setName = (name) => ({ type: SET_NAME, payload: name });
export const setAuthor = (author) => ({ type: SET_AUTHOR, payload: author });
export const setDescription = (description) => ({ type: SET_DESCRIPTION, payload: description });
export const setDate = (date) => ({ type: SET_DATE, payload: date });
export const setGenre = (genre) => ({ type: SET_GENRE, payload: genre });
export const setNumberOfPages = (numberOfPages) => ({
    type: SET_NUMBER_PAGES,
    payload: numberOfPages,
});
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });
export const setRatingBookflix = (rating) => ({ type: SET_RATING_BOOKFLIX, payload: rating });
export const setRatingGoogle = (rating) => ({ type: SET_RATING_GOOGLE, payload: rating });

export default bookPageReducer;
