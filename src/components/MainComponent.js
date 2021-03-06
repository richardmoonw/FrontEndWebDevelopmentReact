import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import '../App.css';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent'
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchComments: () => { dispatch(fetchComments()) },
    fetchPromos: () => { dispatch(fetchPromos()) },
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) }
});

class Main extends Component{
    
    // This method is invoked once the component have been mounted.
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchComments();
        this.props.fetchLeaders();
    }
  
    render() {

        const ContactPage = () => {
            return (
                <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback} />
            );
        }

        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}  
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leaderLoading={this.props.leaders.isLoading}
                    leaderErrMess={this.props.leaders.errMess} />
            );
        }

        const DishWithId = ({match}) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment} />
            );
        }

        const AboutPage = () => {
            return (
                <About leaders={this.props.leaders.leaders} 
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess} />
            );
        }
        
        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/home" component={HomePage} />

                            {/* We pass the Menu component as the return value of an arrow function 
                            because there are props to be passed into it. */}
                            <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/> } />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route exact path="/contactus" component={ContactPage} />
                            <Route path="/aboutus" component={AboutPage} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    } 
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
 