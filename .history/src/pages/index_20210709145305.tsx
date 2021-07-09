import { useState } from 'react';
import { GetStaticProps } from 'next';

import Link from 'next/link';

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

export default function Home(): JSX.Element {
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
    [Prismic.Predicates.at('document.type', 'Post')],
    {
      pageSice: 1,
    }
  )

  return {
    props: {
      data: 1
    }
  }
};

