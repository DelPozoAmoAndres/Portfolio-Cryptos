import os

dir_path = os.path.dirname(os.path.realpath(__file__))

# Fix ViewPropTypes
def fixViewPropTypes():
    file_name=dir_path + "\\node_modules\\react-native-web\\dist\\index.js"
    text_to_append="export const ViewPropTypes = { style: null };"

    if text_to_append in open(file_name).read():
        pass
    else:
        with open(file_name, "a+") as file_object:        
            file_object.write("\n")
            file_object.write(text_to_append)
            file_object.close()
            print("ViewPropTypes fixed")
    
#fix POP_AND_PUSH
def fixPOPandPUSH():
    file_name=dir_path + "\\node_modules\\react-native-router-flux\\src\\ActionConst.js"
    text_to_append="export const POP_AND_PUSH = 'REACT_NATIVE_ROUTER_FLUX_POP_AND_PUSH';"
    if text_to_append in open(file_name).read():
        pass
    else:
        with open(file_name, "a+") as file_object:        
            file_object.write("\n")
            file_object.write(text_to_append)
            file_object.close()
            print("POP_AND_PUSH fixed")

#fix EasingNode
def fixEasingNode():
    file_name=dir_path + "\\node_modules\\react-native-reanimated\\lib\\module\\Animated.js"
    text_to_replace="export { Easing, Transitioning, Transition, createTransitioningComponent // classes"
    text_to_insert="export { Easing as EasingNode, Easing, Transitioning, Transition, createTransitioningComponent // classes"
    lines = open(file_name).read().splitlines()
    for i in range (len(lines)):
        if(text_to_replace in lines[i]):
            lines[i]=text_to_insert
            file = open(file_name,"w")
            for line in lines:
                file.write(line)
                file.write("\n")
            file.close()
            print("EasingNode fixed")
            break

#fix transitionConfig
def fixTransitionConfig():
    file_name=dir_path + "\\node_modules\\react-native-router-flux\\src\\Store.js"
    text_to_find1="if (duration !== undefined && !transitionConfig) {"
    text_to_find2="tabs, modal, lightbox, overlay, drawer, transitionConfig, tabBarComponent,"
    text_to_find3="transitionConfig,"
    text_to_replace2="tabs, modal, lightbox, overlay, drawer, tabBarComponent,"
    file_modified=0

    lines = open(file_name).read().splitlines()
    for i in range (len(lines)):
        if(text_to_find1 in lines[i]):
            for j in range(9):
                lines[i+j]=""
            file_modified=file_modified+1
        if text_to_find2 in lines[i]:
            lines[i]=text_to_replace2
            file_modified=file_modified+1
        if  text_to_find3 in lines[i]:
            lines[i]=""
            file_modified=file_modified+1
    
    if file_modified>0:
        file = open(file_name,"w")
        for line in lines:
                file.write(line)
                file.write("\n")
        file.close()
        print("TransitionConfig fixed")

#fix Header null
def fixHeaderNull():
    file_name=dir_path + "\\node_modules\\react-native-router-flux\\src\\Store.js"
    text_to_find="res.header = null;"
    text_to_replace="res.header = () => false"
    file_modified=False

    lines = open(file_name).read().splitlines()
    for i in range (len(lines)):
        if(text_to_find in lines[i]):
            lines[i]=text_to_replace
            file_modified=True

    if file_modified:
        file = open(file_name,"w")
        for line in lines:
                file.write(line)
                file.write("\n")
        file.close()
        print("HeaderNull fixed")
        
#fix Router
def fixRouter():
    file_name=dir_path + "\\node_modules\\react-native-router-flux\\src\\Router.js"
    text_to_find="sceneStyle: ViewPropTypes.style,"
    text_to_replace="//sceneStyle: ViewPropTypes.style,"
    file_modified=False

    lines = open(file_name).read().splitlines()
    for i in range (len(lines)):
        if(text_to_find in lines[i]):
            lines[i]=text_to_replace
            file_modified=True

    if file_modified:
        file = open(file_name,"w")
        for line in lines:
                file.write(line)
                file.write("\n")
        file.close()
        print("Router fixed")

fixEasingNode()
fixPOPandPUSH()
fixViewPropTypes()
fixTransitionConfig()
fixHeaderNull()
fixRouter()
