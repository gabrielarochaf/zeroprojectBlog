import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';

import Prismic from '@prismicio/client';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import Header from '../components/Header';


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
      <main className={commonStyles.Container}>
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
        </div>
      </main>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async () => {

// };

