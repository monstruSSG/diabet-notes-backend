module.exports = {
    apps: process.env.NODE_ENV === 'prod' ? [
        {
            name: 'backend',
            script: 'src/server.js',
            watch: false,
            env: {
                PORT: process.env.PORT,
                NODE_ENV: 'prod',
                ...process.env
            }
        }
    ] : [
            {
                name: 'backend',
                script: 'src/server.js',
                node_args: [
                    '--inspect=0.0.0.0:9696'
                ],
                watch: true,
                watch_options: {
                    usePolling: true
                },
                ignore_watch: [
                    'node_modules',
                    'files'
                ],
                env: {
                    PORT: process.env.PORT,
                    NODE_ENV: 'dev',
                    ...process.env
                }
            }]
}