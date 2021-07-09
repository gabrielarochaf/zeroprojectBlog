import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { formatDate } from '../utils';
import { useState } from 'react';

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

export default function Home({ postsPagination }: HomeProps) {

  const formattedPost = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: formatDate(post.first_publication_date)
    }
  })

  const [posts, setPosts] = useState<Post[]>(formattedPost);

  return (
    <>
      <head>
        <title>Blog | Spacetravaling</title>
      </head>

      {posts.map(post => (
        <a>
          <strong>{post.data.title}</strong>
          <p>{post.data.subtitle}</p>
          <div className={styles.content}>
            <time>{post.first_publication_date}</time>
            <span>{post.data.author}</span>
          </div>
        </a>
      ))}
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
