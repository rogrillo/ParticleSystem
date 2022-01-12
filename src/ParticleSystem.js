(function(w) {

	//	--------
	//	Vector2d
	//	--------
	var Vector2d = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};

	//	--------
	//	Particle
	//	--------
	var Particle = function() {
		this.pos = new Vector2d;
		this.vel = new Vector2d;
		this.color = null;
		this.size = null;
	};

	//	--------------
	//	ParticleSystem
	//	--------------
	var ParticleSystem = function() {
	};

	var p = ParticleSystem.prototype;

	p.particleNum = null;
	p.particles = [];
	p.totForce = new Vector2d;
	p.maxVel = null;
	p.maxSize = null;
	p.pos = null;
	p.posFn = null;
	p.colorArray = null;
	p.bgColor = null;
	p.canvas = null;
	p.ctx = null;
	p.fps = 30;
	p.loop = null;

	p.initParticles = function() {
		for(var i = 0; i < this.particleNum; i++) {
			this.initParticle(i);
		}
	};

	p.initParticle = function(i) {

		var self = this.particles[i] = new Particle;
		
		if(typeof this.pos === "function") {
			var temp = this.pos();
			self.pos.x = temp.x;
			self.pos.y = temp.y;
		} else {
			self.pos.x = this.pos.x;
			self.pos.y = this.pos.y;
		}

		self.vel.x = Math.random() * this.maxVel.x;
		self.vel.y = Math.random() * this.maxVel.y;
		self.color = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];
		self.size = Math.random() * this.maxSize;

	};

	p.init = function(particleNum, forces, maxVel, pos, colorArray, bgColor, maxSize) {

		this.particleNum = particleNum;
		this.totForce.x = 0;
		this.totForce.y = 0;
		
		if(forces instanceof Vector2d) {
			this.totForce.x += forces.x;
			this.totForce.y += forces.y;
		}
		
		this.maxVel = maxVel;
		this.maxSize = maxSize || 3;
		this.pos = pos;
		this.colorArray = colorArray;
		this.bgColor = bgColor;
		this.initParticles();
		
	};

	p.run = function(canvasId, fps) {

		var canvas = this.canvas = document.getElementById(canvasId)
			ctx = this.ctx = this.canvas.getContext('2d')
			fps = this.fps = fps || 30,
			self = this;
		
		self.loop = setInterval(function() {
		
			ctx.fillStyle = self.bgColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			for(var i = 0; i < self.particleNum; i++) {
			
				var p = self.particles[i];
			
				ctx.beginPath();
				ctx.fillStyle = p.color;
				ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2, true);
				ctx.fill();
				ctx.closePath();
				
				p.vel.x += self.totForce.x;
				p.vel.y += self.totForce.y;
				p.pos.x += p.vel.x;
				p.pos.y += p.vel.y;
				
				if(p.pos.x >= canvas.width || p.pos.x <= 0 || p.pos.y >= canvas.height || p.pos.y <= 0) {
					self.initParticle(i);
				}
				
			}
		
		}, 1000 / fps);
		
	};

	p.stop = function() {
		clearInterval(this.loop);
		this.ctx.fillStyle = self.bgColor;
		this.ctx.fillRect(0, 0, canvas.width, canvas.height);
	};
	
	w.Vector2d = Vector2d;
	w.Particle = Particle;
	w.ParticleSystem = ParticleSystem;

})(window);
