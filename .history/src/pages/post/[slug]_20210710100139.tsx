import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';
import { RichText } from 'prismic-dom';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  console.log(post)
  return (
    <>
      <Head>
        <title>Blog | Post</title>
      </Head>

      <img src="/assets/Banner.svg" alt="banner" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.posts}>
          <div className={styles.TopPost}>
            <h1>Titulo Texto</h1>
            <ul>
              <li>
                <FiCalendar />
                12 de maio 2020
              </li>
              <li>
                <FiUser />
                Gabis
              </li>
              <li>
                <FiClock />
                4pm
              </li>
            </ul>
          </div>

          {post.data.content.map(content => (
            <article key={content.heading}>
              <h2>{content.heading}</h2>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{ __html: RichText.asHtml(content.body) }}
              />
            </article>
          ))}

        </div>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return {
    paths: [],
    fallback: true
  }
};

export const getStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        }
      })
    }
  }
  return {
    props: {
      post,
    }
  }

  // TODO
};
