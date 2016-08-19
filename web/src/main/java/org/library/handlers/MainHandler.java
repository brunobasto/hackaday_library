package org.library.handlers;

import com.google.template.soy.SoyFileSet;
import com.google.template.soy.SoyFileSet.Builder;
import com.google.template.soy.data.SanitizedContent;
import com.google.template.soy.data.SoyMapData;
import com.google.template.soy.tofu.SoyTofu;
import com.google.template.soy.tofu.SoyTofu.Renderer;
import com.wedeploy.api.sdk.ContentType;
import com.wedeploy.api.sdk.Context;
import com.wedeploy.api.sdk.Response;

public class MainHandler {
	
	protected SoyFileSet getSoyFileSet(Context context) throws Exception {
		Builder builder = SoyFileSet.builder();

		context.webFiles("**/*.soy")
        .forEach(path -> builder.add(path.toFile()));

		return builder.build();
	}

	public void handle(Response res) throws Exception {
		SoyMapData soyMapData = new SoyMapData();
		
		SanitizedContent loginContent = renderSoy(
			res, "LoginForm.render", soyMapData);
		
		soyMapData.put("content", loginContent);

		SanitizedContent sanitizedContent = renderSoy(
			res, "Page.render", soyMapData);

		res.end(sanitizedContent.stringValue(), ContentType.HTML);
	}

	private SanitizedContent renderSoy(
			Response res, String namespace, SoyMapData soyMapData)
		throws Exception {

		SoyFileSet soyFileSet = getSoyFileSet(res.context());

		SoyTofu soyTofu = soyFileSet.compileToTofu();

		Renderer renderer = soyTofu.newRenderer(namespace);

		renderer.setData(soyMapData);

		return renderer.renderStrict();
	}
	
}
