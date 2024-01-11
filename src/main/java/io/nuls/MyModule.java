package io.nuls;

import io.nuls.controller.WebServerManager;
import io.nuls.core.core.annotation.Autowired;
import io.nuls.core.core.annotation.Component;
import io.nuls.core.rpc.model.ModuleE;
import io.nuls.core.rpc.modulebootstrap.Module;
import io.nuls.core.rpc.modulebootstrap.RpcModuleState;
import io.nuls.rpctools.TransactionTools;

/**
 * @Author: zhoulijun
 * @Time: 2019-06-10 20:54
 * @Description: Module Business Implementation Class
 */
@Component
public class MyModule {

    @Autowired
    Config config;

    /**
     * Start module
     * After the module is started, this function will be called when all declared dependent modules are ready
     * @param moduleName
     * @return
     */
    public RpcModuleState startModule(String moduleName){
        WebServerManager.getInstance().startServer(config.getExplorerHost(), config.getExplorerPort());
        return RpcModuleState.Running;
    }

    /**
     * Declare other modules that need to be dependent on
     * @return
     */
    public Module[] declareDependent() {
        return new Module[]{
//                Module.build(ModuleE.LG),
//                Module.build(ModuleE.TX),
//                Module.build(ModuleE.AP)
        };
    }

}
