import React from 'react';
import { connect } from 'react-redux';
import { NavBar, SearchBar, Map, Notifications, CommunitiesStatus, Loading } from '../_components'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { communityActions, unitActions } from '../_actions';
import classNames from 'classnames';


class HomePage extends React.Component {

    componentDidMount() {
        this.props.getAllCommunities()
    }

    render() {
        const { allCommunities, loaded, loadedEvents, eventsWithCommunityId } = this.props;

        /*
        <Grid item sm={2} className={classNames("flex", "refreshContainer")}>
        
        </Grid>
        <Grid item sm={2} className={classNames("flex", "filterContainer")}>
        
        </Grid>*/
        return(
            !loaded ? <Loading /> :
            <NavBar>
                <Grid container className="flex" justify="center" alignItems="stretch">
                    <Grid item xs={10} className="flex">
                        <Grid container className="flex" alignItems="stretch" direction="column" justify="space-around">
                            <Grid item className={classNames("flex", "topGridContainer", "padded2x")}>
                                <Grid container className="flex" alignItems="stretch" direction="row" justify="center">
                                    <Grid item sm={6} className={classNames("flex", "searchBarContainer")}>
                                        <SearchBar allCommunities={allCommunities} setCommunity={this.props.setCommunity} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item className={classNames("flex", "bottomGridContainer", "padded")}>
                                <Grid container className="flex" alignItems="stretch" direction="row" justify="space-around">
                                    <Grid item sm={6} className={classNames("flex", "padded")}>
                                        {loadedEvents ? <CommunitiesStatus eventsWithCommunity={eventsWithCommunityId} allCommunities={allCommunities} setCommunity={this.props.setCommunity} /> : <Loading />}
                                    </Grid>
                                    <Grid item sm={6} className={classNames("flex", "padded")}>
                                        <Grid container className="flex" alignItems="stretch" direction="column" justify="space-around">
                                            <Grid item sm className={classNames("flex", "mapContainer")}>
                                                <Map setCommunity={this.props.setCommunity}/>
                                            </Grid>
                                            <Grid item sm className={classNames("flex", "graphDiv")}>
                                                <Grid container className={classNames("flex", "graphContainer")} alignItems="stretch" direction="column" justify="space-around">
                                                    <Grid item sm className="title">
                                                        <Typography variant="headline" component="h3">
                                                            Notifications
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm className="flex">
                                                    {loadedEvents ? <Notifications eventsWithCommunityId={eventsWithCommunityId}/> : <Loading />}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </NavBar>
        )
    }
}


function mapStateToProps(state) {
    const { loaded, allCommunities } = state.communities;
    const { loadedEvents, eventsWithCommunityId } = state.events;
    return {
        allCommunities,
        loaded,
        loadedEvents,
        eventsWithCommunityId
    };
}

const mapDispatchToProps = (dispatch) => ({
    setCommunity: (id) => {
        dispatch(unitActions.setCommunity(id))
    },
    getAllCommunities: () => {
        dispatch(communityActions.getAllCommunities())
    }
})

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };