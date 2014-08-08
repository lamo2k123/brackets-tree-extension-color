define(function(require, exports, module) {

    var FileSystem      = brackets.getModule("filesystem/FileSystem"),
        ExtensionUtils  = brackets.getModule('utils/ExtensionUtils'),
        ProjectManager  = brackets.getModule('project/ProjectManager');

    ExtensionUtils.loadStyleSheet(module, 'styles/style.css');

    var Tree = {
        init : function() {
            FileSystem.on('change', this.color.bind(this));

            $(ProjectManager).on('projectOpen', this.color.bind(this));
            $(ProjectManager).on('projectRefresh', this.color.bind(this));

            return this;
        },

        color : function() {
            var sidebar = document.getElementById('project-files-container'),
                files   = sidebar.getElementsByClassName('jstree-leaf');

            for(var i = 0; i < files.length; i++) {
                var file = files[i].getElementsByClassName('extension');

                if(file.length) {
                    file[0].hasAttribute('data-extension') || file[0].setAttribute('data-extension', file[0].textContent);
                } else {
                    file = files[i].getElementsByTagName('a');

                    if(file.length) {
                        file[0].hasAttribute('data-extension') || file[0].setAttribute('data-extension', file[0].text);
                    }
                }
            }

            return this;
        }

    };

    Tree.init();

});
