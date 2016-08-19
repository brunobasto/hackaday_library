package org.library.handlers;

import java.util.ArrayList;
import java.util.Map;

import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyFileSet.Builder;
import com.google.template.soy.tofu.SoyTofu;
import com.google.template.soy.tofu.SoyTofu.Renderer;
import com.wedeploy.api.WeDeploy;
import com.wedeploy.api.sdk.Auth;
import com.wedeploy.api.sdk.ContentType;
import com.wedeploy.api.sdk.Context;
import com.wedeploy.api.sdk.Request;
import com.wedeploy.api.sdk.Response;

public class LibraryHandler {
	
	protected SoyFileSet getSoyFileSet(Context context) throws Exception {
		Builder builder = SoyFileSet.builder();

		context.webFiles("**/*.soy")
        .forEach(path -> builder.add(path.toFile()));

		return builder.build();
	}

	public void listLibrary(Request request, Response response) throws Exception {
		Map<String, Object> state = request.values(Map.class);

		Response organizationResp = WeDeploy.url("data").path("library").get();
		
		state.put("libraries", organizationResp.bodyValue(ArrayList.class));
		state.put("element", "#content > div");

		if (response.request().headers().contains("X-PJAX")) {
			response
				.contentType(ContentType.JSON)
				.header("Cache-Control", "no-cache, max-age=0, private, must-revalidate, no-store")
				.body(state)
				.end();
		}
		else {
			String content = renderSoy(
				response, "ListLibraries.layout", state);

			response.contentType(ContentType.HTML).body(content).end();
		}
	}

	public void handle(Request request, Response response) throws Exception {
		Map<String, Object> state = request.values(Map.class);
		
		Response organizationResp = WeDeploy.url("data").path("organization").get();
		
		state.put("options", organizationResp.bodyValue(ArrayList.class));
		state.put("name", "");
		state.put("address", "");
		state.put("lending", "");
		
		state.put("element", "#content > div");
		
		if (response.request().headers().contains("X-PJAX")) {
			response
			.contentType(ContentType.JSON)
			.header("Cache-Control", "no-cache, max-age=0, private, must-revalidate, no-store")
			.body(state)
			.end();
		}
		else {
			String content = renderSoy(
					response, "LibraryForm.layout", state);
			
			response.contentType(ContentType.HTML).body(content).end();
		}
	}

	public void createLibrary(Response response, Auth auth) {
		Request request = response.request();

		String organization = request.param("organization");
		String name = request.param("name");
		String address = request.param("address");
		String lending = request.param("lending");

		Response post = WeDeploy.url("data")
			.path("/library")
			.auth(auth)
			.form("organization", organization)
			.form("name", name)
			.form("address", address)
			.form("lending", lending)
			.post();

		if (post.succeeded()) {
			response.redirect("/library/list");
		}
		else {
			response.redirect("/library/list");
		}
	}
	
	private String renderSoy(
			Response res, String namespace, Map<String, Object> state)
		throws Exception {

		SoyFileSet soyFileSet = getSoyFileSet(res.context());

		SoyTofu soyTofu = soyFileSet.compileToTofu();

		Renderer renderer = soyTofu.newRenderer(namespace);

		renderer.setData(state);

		return renderer.render();
	}
	
}
