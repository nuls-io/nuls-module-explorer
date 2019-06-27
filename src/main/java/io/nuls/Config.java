package io.nuls;

import io.nuls.core.core.annotation.Configuration;

/**
 * @Author: zhoulijun
 * @Time: 2019-06-26 11:43
 * @Description: 功能描述
 */
@Configuration(domain = "nuls-module-explorer")
public class Config {

    private String apiModuleApi;

    private int explorerPort;

    private String explorerHost;

    public String getApiModuleApi() {
        return apiModuleApi;
    }

    public void setApiModuleApi(String apiModuleApi) {
        this.apiModuleApi = apiModuleApi;
    }

    public int getExplorerPort() {
        return explorerPort;
    }

    public void setExplorerPort(int explorerPort) {
        this.explorerPort = explorerPort;
    }

    public String getExplorerHost() {
        return explorerHost;
    }

    public void setExplorerHost(String explorerHost) {
        this.explorerHost = explorerHost;
    }
}
