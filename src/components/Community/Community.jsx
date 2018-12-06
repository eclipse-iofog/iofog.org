import React, { Component } from 'react';
import './Community.scss';

// import imgGallery3 from '../../../static/images/img-gallery-03.png';
// import imgGallery4 from '../../../static/images/img-gallery-04.png';
import discourseLogo from '../../../static/images/logos/discourse.svg';

class Community extends Component {
  render() {
    /* function textTruncate(str, length, ending) {
      const textLength = length || 100;
      const textEnding = ending || '...';

      if (str.length > textLength) {
        return str.substring(0, textLength - textEnding.length) + textEnding;
      }

      return str;
    }; */

    return (
      <div className="container entry">
        <section className="row community">
          <section className="col-md-12">
            <div className="entry__header">
              <h2>ioFog Community</h2>
              <p>
                Connect with other ioFog enthusiasts to discuss features,
                architecture, best practices, and help one another.
              </p>
              <div style={{ padding: '60px 0' }}>
                <a
                  href="https://discuss.iofog.org/"
                  className="discourse-button"
                >
                  <img srcSet={discourseLogo} alt="Discourse" />
                </a>
                <a href="https://discuss.iofog.org/" className="button">
                  Visit the ioFog Discussion Forum
                </a>
              </div>
            </div>

            {/*
            <div className="row block-left">
              <div className="col-12 col-md-6 col-lg-5">
                <h4>Get help from the Community</h4>
                <p>This is placeholder copy to introduce the community resources. The paragraph could be up to four
                  sentences, but two are recommended. This is placeholder copy to introduce the community resources.</p>

                <ul className="list community-links">
                  <li>
                    <a className="forum" href="https://discuss.iofog.org/">ioFog Discussion Forum</a>
                  </li>
                  <li>
                    <a className="blog" href="/">Official ioFog Blog</a>
                  </li>
                  <li>
                    <a className="support" href="/">Visit our support page</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-6 col-lg-7">
                <div className="img-holder">
                  <div className="img-01">
                    <img srcSet={imgGallery3} alt="" />
                  </div>
                  <div className="img-02">
                    <img srcSet={imgGallery3} alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row block-right">
              <div className="col-12 col-md-6 col-lg-5">
                <div className="img-holder one-img d-none d-md-block">
                  <div className="img-01">
                    <img srcSet={imgGallery4} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-7">
                <h4>Stay up to date with the latest news.</h4>
                <p>This is placeholder copy to introduce the community resources. The paragraph could be up to four
                  sentences, but two are recommended. This is placeholder copy to introduce the community resources.</p>

                <ul className="list community-links">
                  <li>
                    <Link className="forum" to="/">This is a link with icon</Link>
                  </li>
                  <li>
                    <Link className="blog" to="/">This is a link with icon</Link>
                  </li>
                  <li>
                    <Link className="support" to="/">This is a link with icon</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row block-left">
              <div className="col-12 col-md-6 col-lg-5">
                <h4>Attend a community event</h4>
                <p>This is placeholder copy to introduce the community resources. Two sentences are recommended at most.</p>

                <ul className="list events-list">
                  <li>
                    <Link to="/">
                      <span className="date">
                        12
                        <span>May</span>
                      </span>
                      <span className="wrap">
                        <span>
                          {textTruncate('This is an example of a long event and more', 37, '...')}
                        </span>
                        Toronto, Canada
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <span className="date">
                        12
                        <span>May</span>
                      </span>
                      <span className="wrap">
                        <span>
                          {textTruncate('This is an example of a long event and more', 37, '...')}
                        </span>
                        Toronto, Canada
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <span className="date">
                        12
                        <span>May</span>
                      </span>
                      <span className="wrap">
                        <span>
                          {textTruncate('This is an example of a long event and more', 37, '...')}
                        </span>
                        Toronto, Canada
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-6 col-lg-7">
                <div className="img-holder">
                  <div className="img-01">
                    <img srcSet={imgGallery3} alt="" />
                  </div>
                  <div className="img-02">
                    <img srcSet={imgGallery3} alt="" />
                  </div>
                </div>
              </div>
            </div>
            */}
          </section>
        </section>
      </div>
    );
  }
}

export default Community;
