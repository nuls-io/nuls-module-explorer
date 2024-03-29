package io.nuls.controller;

import io.nuls.Config;
import io.nuls.core.core.annotation.Autowired;
import io.nuls.core.core.annotation.Component;
import io.nuls.core.log.Log;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;

/**
 * @Author: zhoulijun
 * @Time: 2019-06-25 11:21
 * @Description: Function Description
 */
@Path("/api/")
@Component
public class ApiCallController
{



    @Autowired
    Config config;

    Client client = ClientBuilder.newClient();

    @Path("{path:.*}")
    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    public Object api(@Context HttpServletRequest request,
                      @Context HttpServletResponse response,@PathParam("path") String path) {
        Log.debug("do GET , path : {}",path);
        Response res = client.target(config.getApiModuleApi()).path(path).request(MediaType.APPLICATION_JSON_TYPE).get();
        return Response.fromResponse(res).build();
    }
    @Path("{path:.*}")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Object apiPost(Map<String,Object> data, @PathParam("path") String path) {
        Log.debug("do POST , path : {},data:{}",path,data);
        Response res = client.target(config.getApiModuleApi()).path(path).request(MediaType.APPLICATION_JSON_TYPE).post(Entity.json(data));
        return Response.fromResponse(res).build();
    }

}
