import React from "react";
import {gql, useQuery} from "@apollo/client";
import { Layout, QueryResult } from "../components";
import ModuleDetail from "../components/module-detail";

const GET_MODULE = gql`
    query getModule($moduleId: ID!, $trackId: ID!) {
        module(id: $moduleId) {
            id
            title
            videoUrl
            content
        }
        track(id: $trackId) {
            id
            title
            modules {
                id
                title
                length
            }
        }
    }
`

const Module = ({ moduleId, trackId }) => {
    const { loading, error, data } = useQuery(GET_MODULE, {
        variables: { moduleId, trackId }
    })
    return (<Layout >
        <QueryResult error={error} loading={loading} data={data}>
            <ModuleDetail track={data?.track} module={data?.module} />
        </QueryResult>
    </Layout>)
}

export default Module;
