import React from 'react';
import styles from './AllFilms.module.css';

const AllFilms = (props) => {
    const { films } = props;
    let filmsArray;
    if (films) {
        filmsArray = Object.entries(films);
    }
    return (
        <div className={styles.films_container}>
            <section className={styles.now_watching_text}>
                <div className={styles.container}>
                    <div className={styles.section_header}>
                        <div className={styles.section_header_1}>
                            <p className={styles.section_title}>Сейчас смотрят</p>
                        </div>
                        <p className={styles.section_subtitle}>
                            Самые популярные фильмы и сериалы за последний час
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.now_watching_section}>
                <div className={styles.container}>
                    <div className={styles.movies}>
                        {filmsArray &&
                            filmsArray.map((film, index) => (
                                <a
                                    key={index}
                                    href={`/film-page/${film[0]}/tmdb`}
                                    className={styles.movie}
                                >
                                    <div className={styles.movie__cover_inner}>
                                        <img
                                            src={film[1]['poster_path:']}
                                            alt={film[1]['title:']}
                                            className={styles.movie__cover}
                                        />
                                    </div>
                                    <div className={styles.movie__cover__darkened}></div>
                                    <div className={styles.movie__info}>
                                        <div className={styles.movie__title}>
                                            {film[1]['title:']}
                                        </div>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AllFilms;
