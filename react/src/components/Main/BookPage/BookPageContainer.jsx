import React, { useEffect } from 'react';
import BookPage from './BookPage.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    setBookId,
    setName,
    setAuthor,
    setDescription,
    setDate,
    setGenre,
    setNumberOfPages,
    setLanguage,
    setCoverUrl,
    setBuyUrl,
    setShortContent,
    clearContent,
    setLiked,
    setDisliked,
} from '../../../redux/Main/bookPageReducer.js';
import axios from 'axios';
import { server } from '../../../serverconf.js';
import { useParams } from 'react-router-dom';

const BookPageContainer = () => {
    const paramsId = useParams('id').id;
    const dispatch = useDispatch();
    const isCheckingAuth = useSelector((state) => state.sessionReducer.is_checking_auth);

    const handleShortClick = async () => {
        try {
            const shortContentResponse = await axios.get(
                `${server}/short_content/?query=${bookState.name}`,
            );
            const shortContentData = shortContentResponse.data.content;
            dispatch(setShortContent(shortContentData));
        } catch (error) {
            console.error('Ошибка при получении сокращенного контента:', error);
        }
    };

    useEffect(() => {
        let cancelTokenSource;

        if (!isCheckingAuth) {
            cancelTokenSource = axios.CancelToken.source();

            const fetchBookData = async () => {
                try {
                    const bookResponse = await axios.get(`${server}/book/${paramsId}`, {
                        cancelToken: cancelTokenSource.token,
                    });
                    const bookResponseData = bookResponse.data;

                    const favourites = await axios.get(`${server}/favourite`, {
                        cancelToken: cancelTokenSource.token,
                    });

                    // Проверка, есть ли книга в лайкнутых
                    const isLiked = favourites.data['liked_books'].some(
                        (book) => book[1] === bookResponseData.id,
                    );
                    dispatch(setLiked(isLiked));

                    // Проверка, есть ли книга в дизлайкнутых
                    const isDisliked = favourites.data['disliked_books'].some(
                        (book) => book[1] === bookResponseData.id,
                    );
                    dispatch(setDisliked(isDisliked));

                    dispatch(setName(bookResponseData.volumeInfo.title));
                    dispatch(setAuthor(bookResponseData.volumeInfo.authors));
                    dispatch(setDate(bookResponseData.volumeInfo.publishedDate));
                    dispatch(setDescription(bookResponseData.volumeInfo.description));
                    dispatch(setGenre(bookResponseData.volumeInfo.categories));
                    dispatch(setBookId(paramsId));
                    dispatch(setNumberOfPages(bookResponseData.volumeInfo.pageCount));
                    dispatch(setLanguage(bookResponseData.volumeInfo.language));
                    dispatch(setCoverUrl(bookResponseData.volumeInfo.imageLinks.thumbnail));
                    dispatch(setBuyUrl(bookResponseData.accessInfo.webReaderLink));
                } catch (error) {
                    if (!axios.isCancel(error)) {
                        console.error('Ошибка при получении данных книги:', error);
                    }
                }
            };

            fetchBookData();
        }

        return () => {
            if (cancelTokenSource) {
                cancelTokenSource.cancel('Операция была отменена');
            }
        };
    }, [paramsId, isCheckingAuth]);

    useEffect(() => {
        dispatch(clearContent());
    }, []);

    const bookState = useSelector((state) => state.bookPageReducer);
    const shortContent = useSelector((state) => state.bookPageReducer.shortContent);
    const isLiked = useSelector((state) => state.bookPageReducer.isLiked);
    const isDisliked = useSelector((state) => state.bookPageReducer.isDisliked);

    const handleLikeClick = async () => {
        try {
            if (isDisliked) {
                const responseRmDislike = await axios.post(
                    `${server}/book/${paramsId}/delete_disliked_books?disliked_book_title=${bookState.name}&disliked_book_id=${paramsId}`,
                );
                if (responseRmDislike.status === 200) {
                    dispatch(setDisliked(false));
                    const responseAddLike = await axios.post(
                        `${server}/book/${paramsId}/add_liked_books?liked_book_title=${bookState.name}&liked_book_id=${paramsId}`,
                    );
                    if (responseAddLike.status === 200) {
                        dispatch(setLiked(true));
                    }
                }
            } else if (isLiked) {
                const responseRmLike = await axios.post(
                    `${server}/book/${paramsId}/delete_liked_books?liked_book_title=${bookState.name}&liked_book_id=${paramsId}`,
                );
                if (responseRmLike.status === 200) {
                    dispatch(setLiked(false));
                }
            } else if (!isLiked) {
                const responseAddLike = await axios.post(
                    `${server}/book/${paramsId}/add_liked_books?liked_book_title=${bookState.name}&liked_book_id=${paramsId}`,
                );
                if (responseAddLike.status === 200) {
                    dispatch(setLiked(true));
                }
            }
        } catch (error) {
            console.error('Ошибка при добавлении книги в список лайков:', error);
        }
    };

    const handleDislikeClick = async () => {
        try {
            if (isLiked) {
                const responseRmLike = await axios.post(
                    `${server}/book/${paramsId}/delete_liked_books?liked_book_title=${bookState.name}&liked_book_id=${paramsId}`,
                );
                if (responseRmLike.status === 200) {
                    dispatch(setLiked(false));
                    const responseAddDislike = await axios.post(
                        `${server}/book/${paramsId}/add_disliked_books?disliked_book_title=${bookState.name}&disliked_book_id=${paramsId}`,
                    );
                    if (responseAddDislike.status === 200) {
                        dispatch(setDisliked(true));
                    }
                }
            } else if (isDisliked) {
                const responseRmDislike = await axios.post(
                    `${server}/book/${paramsId}/delete_disliked_books?disliked_book_title=${bookState.name}&disliked_book_id=${paramsId}`,
                );
                if (responseRmDislike.status === 200) {
                    dispatch(setDisliked(false));
                }
            } else if (!isDisliked) {
                const responseAddDislike = await axios.post(
                    `${server}/book/${paramsId}/add_disliked_books?disliked_book_title=${bookState.name}&disliked_book_id=${paramsId}`,
                );
                if (responseAddDislike.status === 200) {
                    dispatch(setDisliked(true));
                }
            }
        } catch (error) {
            console.error('Ошибка при добавлении книги в список дизлайков:', error);
        }
    };
    return (
        <BookPage
            bookState={bookState}
            handleShortClick={handleShortClick}
            shortContent={shortContent}
            handleLikeClick={handleLikeClick}
            handleDislikeClick={handleDislikeClick}
            isLiked={isLiked}
            isDisliked={isDisliked}
        />
    );
};

export default BookPageContainer;
