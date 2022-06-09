/*
* 路由处理模块
* */
import { Switch, Route } from 'react-router-dom'
import route from "react-router-dom/es/Route";

function routerrender(routes){
    return (
        <Switch>
            {
                routes.map(route=>(
                    <Route
                        key={route.path}
                        path={route.path}
                        render={props => {
                            if(route.render){ // 判断如果时render渲染则调用render继续渲染
                                return route.render(...props,route)
                                // 将history, location, match,route传下去
                            }
                            // 组件的话，直接渲染
                            return <route.component {...props} route={route} />
                            // 将history, location, match,route传下去
                        }}
                    />
                ))

            }
        </Switch>
    )
}
export default routerrender
