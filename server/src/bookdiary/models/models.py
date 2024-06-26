# pylint: disable=R0903, W0611


"""
Модели для базы данных.
"""

from sqlalchemy import Column, Integer, JSON, String, Text
from sqlalchemy import text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base

BookDiary_Base = declarative_base()


class Publics(BookDiary_Base):
    """
    Класс для представления общественных записей пользователей.
    """

    __tablename__ = "user_publics"
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        server_default=text("uuid_generate_v4()"),
    )
    user_id = Column(UUID(as_uuid=True), nullable=False)
    book_id = Column(String(), nullable=False)
    book_name = Column(String(), nullable=False)
    book_authors = Column(JSON(), nullable=False)
    publication_date = Column(String(50), nullable=False)
    article_name = Column(String(50), nullable=False)
    book_genre = Column(String(), nullable=False)
    text = Column(Text(), nullable=False)
    likes = Column(Integer(), default=0)


class Likes(BookDiary_Base):
    """
    Класс для представления лайков пользователей.
    """

    __tablename__ = "user_likes"
    user_id = Column(UUID(as_uuid=True), nullable=False, primary_key=True)
    article_id = Column(UUID(as_uuid=True), nullable=False, primary_key=True)


class Subs(BookDiary_Base):
    """
    Класс для представления подписок пользователей.
    """

    __tablename__ = "user_subs"
    user_id = Column(UUID(as_uuid=True), nullable=False, primary_key=True)
    sub_id = Column(UUID(as_uuid=True), nullable=False, primary_key=True)
