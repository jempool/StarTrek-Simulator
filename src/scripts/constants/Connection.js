const RABBITMQ_DEFAULT_CHANNEL = "teamName/topic";
const RABBITMQ_USERNAME = "admin";
const RABBITMQ_PASSWORD = "admin";
const RABBITMQ_HOST = "frontend.ascuy.me";
const RABBITMQ_PORT = 443;
const RABBITMQ_SSL = true;
const RABBITMQ_KEEPALIVE = 20;
const RABBITMQ_PATH = "ws";

class Connection {
  static get rabbitmqDefaultChannel() {
    return RABBITMQ_DEFAULT_CHANNEL;
  }

  static get rabbitmqUsername() {
    return RABBITMQ_USERNAME;
  }
  
  static get rabbitmqPassword() {
    return RABBITMQ_PASSWORD;
  }

  static get rabbitmqHost() {
    return RABBITMQ_HOST;
  }

  static get rabbitmqPort() {
    return RABBITMQ_PORT;
  }

  static get rabbitmqSSL() {
    return RABBITMQ_SSL;
  }

  static get rabbitmqKeepalive() {
    return RABBITMQ_KEEPALIVE;
  }

  static get rabbitmqPath() {
    return RABBITMQ_PATH;
  }
}
