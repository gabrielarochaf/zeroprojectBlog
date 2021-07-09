import { useState } from 'react';
import { GetStaticProps } from 'next';

import Link from 'next/link';
import { format } from 'date-fns'

import { FiCalendar, FiUser } from 'react-icons/fi';

import Prismic from '@prismicio/client';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';




interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {

  const formattedPost = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MM yyyy'
      )
    }
  })

  return (
    <>
      <main className={commonStyles.container}>
        <div className={styles.posts}>
          <Link href="/">
            <a className={styles.post}>
              <strong>Titulo</strong>
              <p>Nome qualquer do texto que vai ta publicado</p>
              <ul>
                <li>
                  <FiCalendar />
                  02 jun 2021
                </li>
                <li>
                  <FiUser />
                  Gabis Oliveira
                </li>
              </ul>
            </a>
          </Link>


          <Link href="/">
            <a className={styles.post}>
              <strong>Titulo</strong>
              <p>Nome qualquer do texto que vai ta publicado</p>
              <ul>
                <li>
                  <FiCalendar />
                  02 jun 2021
                </li>
                <li>
                  <FiUser />
                  Gabis Oliveira
                </li>
              </ul>
            </a>
          </Link>

          <button type="button">Carregar mais posts</button>

        </div>



      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 1,
    }
  )
  const posts = postResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  });

  const postPagination = {
    next_page: postResponse.next_page,
    results: posts,
  }
  return {
    props: {
      postResponse,
      postPagination
    }
  }
};

