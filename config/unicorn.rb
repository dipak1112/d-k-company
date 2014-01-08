# config/unicorn.rb
@dir = "/sites/d-k-company/"
# /home/dipak/sites/rails4/keshariya/keshariya-company
worker_processes 2
working_directory @dir

timeout 100


listen "#{@dir}tmp/sockets/unicorn.sock", :backlog => 64


pid "#{@dir}tmp/pids/unicorn.pid"


stderr_path "#{@dir}log/unicorn.stderr.log"
stdout_path "#{@dir}log/unicorn.stdout.log"
