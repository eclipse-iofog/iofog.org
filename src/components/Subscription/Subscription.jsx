import React, { Component } from 'react';
import { MdArrowForward } from 'react-icons/md';
import './Subscription.scss';

import bgSubscriptionLeft from '../../../static/images/bg/bg-subscription-left.png';
import bgSubscriptionRight from '../../../static/images/bg/bg-subscription-right.png';

class Subscription extends Component {
  render() {
    return (
      <section className="subscription">
        <img
          className="subscription__bg-lt"
          srcSet={bgSubscriptionLeft}
          alt=""
        />
        <section className="container">
          <section className="row">
            <section className="col-md-12">
              <div className="sections__header text-center">
                <h4>
                  Stay up to date by <br /> signing up for our newsletter.
                </h4>
              </div>

              <form name="subscription">
                <input type="email" placeholder="Your email address" />

                <button type="subject">
                  <MdArrowForward />
                </button>
              </form>
            </section>
          </section>
        </section>
        <img
          className="subscription__bg-rt"
          srcSet={bgSubscriptionRight}
          alt=""
        />
      </section>
    );
  }
}

export default Subscription;
